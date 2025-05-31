import './payment.css';
import HeaderBar from '../../components/layouts/headerbar';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('creditcard');
  const [agreed, setAgreed] = useState(false);
  const [orderData, setOrderData] = useState(null); // Store the whole object from localStorage
  const [billDetails, setBillDetails] = useState(null);

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const storedOrderData = localStorage.getItem('orderRoomData');
    if (storedOrderData) {
      const parsedData = JSON.parse(storedOrderData);
      setOrderData(parsedData);

      // Calculate bill details once data is loaded
      if (parsedData.selectedRoom && parsedData.selectedRoom.price && parsedData.roomQuantity) {
        const total = parsedData.roomQuantity * parsedData.selectedRoom.price;
        const taxRate = 0.1; // Assuming 10% VAT
        const taxAmount = total * taxRate;
        const grandTotal = total; // Assuming price includes tax or tax is handled differently by API
        // Recalculate grandTotal based on actual API logic if needed
        // const grandTotal = total + taxAmount; // Example if VAT is added
        // Or use discount logic if applicable from API response later

        setBillDetails({
          customer: parsedData.customer,
          room: parsedData.selectedRoom.name,
          quantity: parsedData.roomQuantity,
          total: total,
          taxDisplay: `${taxRate * 100}%`, // For display
          grandTotal: grandTotal, // Initial grand total, might be updated after API call
          discountAmount: 10000 // Placeholder, will be set by API potentially
        });
      } else {
        console.error("Missing price or quantity info in orderData");
        alert("Lỗi: Không tìm thấy thông tin giá hoặc số lượng phòng.");
        // navigate('/'); // Optional: Redirect if data is incomplete
      }
    } else {
      console.error("Order data not found in localStorage.");
      alert("Lỗi: Không tìm thấy dữ liệu đặt phòng. Vui lòng thử lại.");
      navigate('/'); // Redirect if no data
    }
  }, [navigate]);
  const handlePay = async (e) => {
    e.preventDefault();
    if (!agreed) {
      alert('Bạn cần đồng ý với điều khoản trước khi thanh toán!');
      return;
    }
    if (!orderData || !billDetails) {
        alert('Lỗi: Dữ liệu đơn hàng không hợp lệ.');
        return;
    }

    // 1. Call the /order API to create the order
    try {
      const orderResponse = await fetch("http://localhost:8080/bookingtravel/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          // Pass necessary data to create the order
          // Adjust fields based on actual API requirements
          fullName: orderData.customer,
          email: orderData.email,
          phoneNumber: orderData.phoneNum,
          totalPrice: billDetails.grandTotal, // Use calculated grand total
          discountAmount:10000,
          // bookingId: orderData.bookingId, // Pass booking ID if needed by API
          // paymentMethod: paymentMethod, // Pass payment method if needed
          // discountAmount: 0, // Calculate or get discount from somewhere if applicable
        }),
      });

      if (!orderResponse.ok) {
        const err = await orderResponse.json();
        throw new Error(err.message || 'Lỗi tạo đơn hàng từ API');
      }

      const orderResult = await orderResponse.json();

      // Assuming API returns { code: 1000, message: '...', result: { id: 'newOrderId', discountAmount: 50.00, ... } }
      if (orderResult.code === 1000 && orderResult.result && orderResult.result.id) {
        const newOrderId = orderResult.result.id;
        // Optional: Update bill details with discount if provided by API
        const finalPrice = orderResult.result.finalPrice || billDetails.grandTotal; // Use final price from API if available

        // 2. Call the /orderDetails API to add details to the created order
        try {
          const detailResponse = await fetch("http://localhost:8080/bookingtravel/orderDetails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              order: newOrderId, // Use the ID from the newly created order
              itemType: 'room_booking',
              itemId: orderData.selectedRoom.id, // Use the actual room ID
              price: finalPrice, // Use the final price (potentially after discount)
              quantity: orderData.roomQuantity // Add quantity if needed by API
            }),
          });
          if (!detailResponse.ok) {
            const detailErr = await detailResponse.json();
            throw new Error(detailErr.message || 'Lỗi tạo chi tiết đơn hàng từ API');
          }

          const detailResult = await detailResponse.json();

          // Assuming API returns { code: 1000, message: '...' }
          if (detailResult.code === 1000) {
            alert("Thanh toán và đặt phòng thành công!");
            localStorage.removeItem('orderRoomData'); // Clear data after successful process
            localStorage.removeItem('bookingData'); // Clear original booking data too
            navigate('/'); // Navigate to a success page or home
          } else {
            throw new Error(detailResult.message || 'Lỗi tạo chi tiết đơn hàng.');
          }
        } catch (detailError) {
          console.error("Lỗi khi gọi API chi tiết đơn hàng:", detailError);
          alert(`Đã xảy ra lỗi khi lưu chi tiết đơn hàng: ${detailError.message}. Vui lòng liên hệ hỗ trợ.`);
          // Consider how to handle partial success (order created, details failed)
        }
      } else {
        throw new Error(orderResult.message || 'Lỗi tạo đơn hàng.');
      }
    } catch (error) {
      console.error("Lỗi trong quá trình thanh toán:", error);
      alert(`Đã xảy ra lỗi hệ thống: ${error.message}`);
    }
  };

  // Render loading or error state if data is not ready
  if (!orderData || !billDetails) {
    return (
        <>
            <HeaderBar />
            <div className="PaymentPage-container">
                <h1>Đang tải thông tin thanh toán...</h1>
                {/* You could add a spinner here */}
            </div>
        </>
    );
  }

  return (
    <>
      <HeaderBar />
      <div className="PaymentPage-container">
        <h1>THANH TOÁN ĐƠN ĐẶT PHÒNG</h1>
        <div className="PaymentPage-bill">
          <h2>Thông tin hóa đơn</h2>
          <p><b>Khách hàng:</b> {billDetails.customer}</p>
          <p><b>Phòng:</b> {billDetails.room}</p>
          <p><b>Số lượng:</b> {billDetails.quantity}</p>
          <p><b>Tạm tính:</b> {billDetails.total.toLocaleString()} đ</p>
          <p><b>Thuế VAT (ước tính):</b> {billDetails.taxDisplay}</p>
          {/* Display discount if applicable */}
          {/* <p><b>Giảm giá:</b> {billDetails.discountAmount.toLocaleString()} đ</p> */}
          <p><b>Tổng thanh toán:</b> <span className="PaymentPage-grandtotal">{billDetails.grandTotal.toLocaleString()} đ</span></p>
        </div>
        <form className="PaymentPage-form" onSubmit={handlePay}>
          <h2>Phương thức thanh toán</h2>
          <div className="PaymentPage-methods">
            {/* Payment method options */}
            <label>
              <input type="radio" value="creditcard" checked={paymentMethod === 'creditcard'} onChange={() => setPaymentMethod('creditcard')} />
              Thẻ tín dụng/Ghi nợ
            </label>
            <label>
              <input type="radio" value="bank" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} />
              Chuyển khoản ngân hàng
            </label>
            <label>
              <input type="radio" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} />
              Thanh toán khi nhận phòng
            </label>
          </div>
          <div className="PaymentPage-agree">
            <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} id="agree-checkbox" />
            <label htmlFor="agree-checkbox">Tôi đồng ý với <a href="#" target="_blank" rel="noopener noreferrer">điều khoản & chính sách</a></label>
          </div>
          <button className="PaymentPage-pay-btn" type="submit" disabled={!agreed}>Thanh toán</button>
        </form>
      </div>
    </>
  );
};

export default PaymentPage;