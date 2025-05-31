import './orderpage.css';
import HeaderBar from '../../components/layouts/headerbar';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const OrderPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    note: '',
  });
  const [selectedRoom, setSelectedRoom] = useState('');
  const [checkIn, setcheckIn] = useState('');
  const [checkOut, setcheckOut] = useState('');
  const [guests, setguests] = useState('');
  // Removed unused filteredRooms state

  useEffect(() => {
    const bookingData = JSON.parse(localStorage.getItem('bookingData'));
    if (bookingData) {
      setSelectedRoom(bookingData.room);
      setcheckIn(bookingData.checkIn);
      setcheckOut(bookingData.checkOut);
      setguests(bookingData.guests);
    } else {
      // Handle case where bookingData is not found, maybe redirect or show error
      console.error("Booking data not found in localStorage.");
      // navigate('/'); // Example: redirect to home
    }
  }, []);

  const [quantity, setQuantity] = useState(1);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Basic validation (optional but recommended)
    if (!form.fullName || !form.phone || !form.email) {
        alert("Vui lòng điền đầy đủ thông tin bắt buộc (*).");
        return;
    }

    fetch("http://localhost:8080/bookingtravel/room/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        roomId: selectedRoom.id,
        checkIn: checkIn,
        checkOut: checkOut,
        numberOfRooms: quantity,
        adults: guests.adults,
        children: guests.children
      }),
    })
    .then(response => {
        if (!response.ok) {
            // Handle HTTP errors (e.g., 4xx, 5xx)
            return response.json().then(err => {
                throw new Error(err.message || 'Lỗi mạng hoặc máy chủ');
            });
        }
        return response.json(); // Parse JSON response
    })
    .then(result => {
      // Assuming the API returns { code: 1000, message: '...', result: { id: 'bookingId', ... } }
      debugger
      if (result.result && result.result.user.id) {
        alert("Xác nhận thành công! Chuẩn bị chuyển đến trang thanh toán.");
        
        // Prepare data for PaymentPage
        const orderRoomData = {
          roomQuantity: quantity,
          phoneNum: form.phone,
          email: form.email,
          customer: form.fullName,
          // IMPORTANT: Assuming the booking ID is returned in result.result.id
          // This ID might be needed if the /order API needs it, or just for reference
          bookingId: result.result.id,
          // Pass necessary room details for PaymentPage
          selectedRoom: selectedRoom,
          checkIn: checkIn,
          checkOut: checkOut,
          guests: guests
        };
        localStorage.setItem('orderRoomData', JSON.stringify(orderRoomData));

        // Navigate to PaymentPage only after successful booking and saving data
        navigate('/PaymentPage');
      } else {
        // Handle API-specific errors (e.g., code !== 1000)
        throw new Error(result.message || 'Xác nhận thất bại từ API.');
      }
    })
    .catch(error => {
      // Handle fetch errors (network issues) or errors thrown above
      console.error("Lỗi khi gọi API đặt phòng:", error);
      alert(`Đã xảy ra lỗi: ${error.message}`);
      // Do NOT navigate if there's an error
    });
  };

  return (
    <>
      <HeaderBar />
      <div className="OrderPage-container">
        <h1>ĐẶT PHÒNG KHÁCH SẠN</h1>
        {/* Form needs onSubmit={handleSubmit} on the <form> tag */}
        <form className="OrderPage-form" onSubmit={handleSubmit}>
          <div className="OrderPage-form-group">
            <label>Họ và tên *</label>
            <input name="fullName" value={form.fullName} onChange={handleChange} required />
          </div>
          <div className="OrderPage-form-group">
            <label>Số điện thoại *</label>
            <input name="phone" value={form.phone} onChange={handleChange} required />
          </div>
          <div className="OrderPage-form-group">
            <label>Email *</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          {/* Removed empty form group */}
          <div className="OrderPage-form-group">
            <label>Số lượng phòng</label>
            <input type="number" min={1} max={5} value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
          </div>
          <div className="OrderPage-form-group">
            <label>Tổng tiền</label>
            {/* Ensure selectedRoom and selectedRoom.price exist before calculating */}
            <p>{selectedRoom && selectedRoom.price ? (selectedRoom.price * quantity).toLocaleString() + ' đ' : 'N/A'}</p>
          </div>
          <div className="OrderPage-form-group">
            <label>Ghi chú</label>
            <textarea name="note" value={form.note} onChange={handleChange} />
          </div>
          <button className="OrderPage-submit" type="submit">Xác nhận đặt phòng</button>
        </form>

        <div className="OrderPage-summary">
          <h2>Thông tin đặt phòng</h2>
          <p><b>Khách hàng:</b> {form.fullName || '---'}</p>
          {/* Ensure selectedRoom exists before accessing its properties */}
          <p><b>Khách sạn:</b> {selectedRoom?.hotelName || '---'}</p>
          <p><b>Phòng:</b> {selectedRoom?.name || '---'}</p>
          <p><b>Số lượng:</b> {quantity}</p>
          <p><b>Tổng tiền:</b> {selectedRoom && selectedRoom.price ? (quantity * selectedRoom.price).toLocaleString() + ' đ' : 'N/A'}</p>
        </div>
      </div>
    </>
  );
};

export default OrderPage;

