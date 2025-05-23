import React, { useState } from 'react';
import './payment.css';
import HeaderBar from '../../components/layouts/headerbar';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('creditcard');
  const [agreed, setAgreed] = useState(false);

  const handlePay = (e) => {
    e.preventDefault();
    if (!agreed) {
      alert('Bạn cần đồng ý với điều khoản trước khi thanh toán!');
      return;
    }
    // Xử lý thanh toán (giả lập)
    alert('Thanh toán thành công!');
  };

  // Thông tin hóa đơn mẫu
  const bill = {
    customer: 'Nguyễn Văn A',
    room: 'Deluxe Room',
    quantity: 2,
    total: 1600000,
    tax: 160000,
    grandTotal: 1760000,
  };

  return (
    <>
      <HeaderBar />
      <div className="PaymentPage-container">
        <h1>THANH TOÁN ĐƠN ĐẶT PHÒNG</h1>
        <div className="PaymentPage-bill">
          <h2>Thông tin hóa đơn</h2>
          <p><b>Khách hàng:</b> {bill.customer}</p>
          <p><b>Phòng:</b> {bill.room}</p>
          <p><b>Số lượng:</b> {bill.quantity}</p>
          <p><b>Tạm tính:</b> {bill.total.toLocaleString()} đ</p>
          <p><b>Thuế VAT:</b> {bill.tax.toLocaleString()} đ</p>
          <p><b>Tổng thanh toán:</b> <span className="PaymentPage-grandtotal">{bill.grandTotal.toLocaleString()} đ</span></p>
        </div>
        <form className="PaymentPage-form" onSubmit={handlePay}>
          <h2>Phương thức thanh toán</h2>
          <div className="PaymentPage-methods">
            <label>
              <input
                type="radio"
                value="creditcard"
                checked={paymentMethod === 'creditcard'}
                onChange={() => setPaymentMethod('creditcard')}
              />
              Thẻ tín dụng/Ghi nợ
            </label>
            <label>
              <input
                type="radio"
                value="bank"
                checked={paymentMethod === 'bank'}
                onChange={() => setPaymentMethod('bank')}
              />
              Chuyển khoản ngân hàng
            </label>
            <label>
              <input
                type="radio"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={() => setPaymentMethod('cash')}
              />
              Thanh toán khi nhận phòng
            </label>
          </div>
          <div className="PaymentPage-agree">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
            />
            <span>Tôi đồng ý với <a href="#">điều khoản & chính sách</a></span>
          </div>
          <button className="PaymentPage-pay-btn" type="submit">Thanh toán</button>
        </form>
      </div>
    </>
  );
};

export default PaymentPage;