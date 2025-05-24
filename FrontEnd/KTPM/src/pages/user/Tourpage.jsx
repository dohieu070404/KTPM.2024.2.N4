import React from 'react';
import './TourPage.css';

const TourPage = () => {
  return (
    <div className="tour-page__container">
      {/* Phần giới thiệu */}
      <section className="tour-page__header">
        <h1 className="tour-page__main-title">DU LỊCH HÀ NỘI</h1>
        <p className="tour-page__description">
          Hà Nội là thủ đô ngàn năm văn hiến... (nội dung đầy đủ)
        </p>
      </section>

      {/* Bộ lọc */}
      <section className="tour-page__filter">
        <h2 className="tour-page__filter-title">BỘ LỌC TÌM KIẾM</h2>
        
        <div className="tour-page__filter-grid">
          {/* Ngân sách */}
          <div className="tour-page__filter-section">
            <h3 className="tour-page__filter-subtitle">Ngân sách</h3>
            <div className="tour-page__filter-options">
              {['Dưới 5 triệu', 'Từ 5 - 10 triệu', 'Từ 10 - 20 triệu', 'Trên 20 triệu'].map((option) => (
                <button key={option} className="tour-page__filter-chip">
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Các phần filter khác */}
          <div className="tour-page__filter-section">
            <h3 className="tour-page__filter-subtitle">Điểm khởi hành</h3>
            <div className="tour-page__filter-options">
              <button className="tour-page__filter-chip tour-page__filter-chip--active">Tất cả</button>
            </div>
          </div>
        </div>
      </section>

      {/* Danh sách tour */}
      <section className="tour-page__list">
        <div className="tour-page__card">
          <div className="tour-page__badge-container">
            <span className="tour-page__duration-badge">6N5Đ</span>
            <span className="tour-page__promo-badge">Giá tốt</span>
          </div>
          
          <h3 className="tour-page__tour-title">
            Hà Nội - Yên Tử - Vịnh Hạ Long - Ninh Bình - Chùa Bái Đính - KDL Tràng An
          </h3>
          
          <div className="tour-page__info-grid">
            <div className="tour-page__info-item">
              <span>Mã tour:</span>
              <strong>NDSGN1064</strong>
            </div>
            <div className="tour-page__info-item">
              <span>Thời gian:</span>
              <strong>4N3D</strong>
            </div>
            <div className="tour-page__info-item">
              <span>Ngày khởi hành:</span>
              <strong>T7, 24 tháng 5, 2025</strong>
            </div>
            <div className="tour-page__info-item">
              <span>Phương tiện:</span>
              <strong>Máy bay</strong>
            </div>
          </div>

          <div className="tour-page__price-container">
            <span className="tour-page__price-label">Giá tốt</span>
            <span className="tour-page__price-value">7.790.000 đ</span>
          </div>

          <button className="tour-page__detail-btn">Xem chi tiết</button>
        </div>
      </section>
    </div>
  );
};

export default TourPage;