import React, { useState } from 'react';
import './orderpage.css';
import HeaderBar from '../../components/layouts/headerbar';

const OrderPage = () => {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    note: '',
  });

  const [selectedRoom, setSelectedRoom] = useState('Deluxe Room');
  const [quantity, setQuantity] = useState(1);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đặt phòng, có thể gửi dữ liệu tới server ở đây
    alert('Đặt phòng thành công!');
  };

  return (
    <>
      <HeaderBar />
      <div className="OrderPage-container">
        <h1>ĐẶT PHÒNG KHÁCH SẠN</h1>
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
          <div className="OrderPage-form-group">
            <label>Loại phòng</label>
            <select value={selectedRoom} onChange={e => setSelectedRoom(e.target.value)}>
              <option value="Deluxe Room">Deluxe Room</option>
              <option value="Superior Room">Superior Room</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
          <div className="OrderPage-form-group">
            <label>Số lượng phòng</label>
            <input type="number" min={1} max={5} value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
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
          <p><b>Phòng:</b> {selectedRoom}</p>
          <p><b>Số lượng:</b> {quantity}</p>
        </div>
      </div>
    </>
  );
};

export default OrderPage;