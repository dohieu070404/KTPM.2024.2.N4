import React from 'react';
import './ComboSearchPage.css';

const ComboSearchPage = () => {
  return (
    <div className="combo-search">
      <h1 className="combo-search__main-title">COMBO MÁY BAY + KHÁCH SẠN</h1>
      
      {/* Bộ lọc */}
      <section className="combo-search__filters">
        <h2 className="combo-search__section-title">ĐỘ LỢC TÌM KIẾM</h2>
        
        <div className="combo-search__filter-group">
          <h3 className="combo-search__filter-label">Phương tiện:</h3>
          <div className="combo-search__filter-options">
            <label className="combo-search__option">
              <input type="checkbox" /> Xe
            </label>
            <label className="combo-search__option">
              <input type="checkbox" /> Máy bay
            </label>
          </div>
        </div>

        <div className="combo-search__filter-group">
          <h3 className="combo-search__filter-label">Giám khảo hành:</h3>
          <div className="combo-search__filter-options">
            <span className="combo-search__selected-value">TP. Hồ Chí Minh</span>
          </div>
        </div>

        {/* Các filter khác */}
        <div className="combo-search__divider"></div>
        
        <div className="combo-search__filter-group">
          <h3 className="combo-search__filter-label">Ngân sách:</h3>
          <div className="combo-search__filter-options">
            {['Dưới 5 triệu', 'Từ 5 - 10 triệu', 'Từ 10 - 20 triệu', 'Trên 20 triệu'].map((option) => (
              <button key={option} className="combo-search__budget-option">
                {option}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Đề xuất */}
      <section className="combo-search__recommendations">
        <h2 className="combo-search__section-title">Tiền nghị chỗ đi:</h2>
        <ul className="combo-search__recommend-list">
          {['Will miễn ghi', 'Nhà năng riêng', 'Hồ khí', 'Quốc gia vận động'].map((item) => (
            <li key={item} className="combo-search__recommend-item">{item}</li>
          ))}
        </ul>
      </section>

      {/* Kết quả */}
      <section className="combo-search__results">
        <div className="combo-search__result-header">
          <span className="combo-search__result-count">Chúng tôi đã tìm thấy 1 giờ cho bạn.</span>
          <div className="combo-search__sort">
            <span>Sắp xếp theo:</span>
            <select className="combo-search__sort-select">
              <option>Giá trị nhập đến cao</option>
            </select>
          </div>
        </div>

        {/* Card kết quả */}
        <div className="combo-search__result-card">
          <div className="combo-search__card-header">
            <h3 className="combo-search__card-title">Hà NH phụ:</h3>
            <span className="combo-search__card-price">3.990.000 đ</span>
          </div>
          
          <div className="combo-search__card-details">
            <p className="combo-search__card-description">
              Hà NH được Cường Võ máy bay trở lên + 1 đến kết quả của “Emotion Hà...”
            </p>
            <div className="combo-search__card-info">
              <span className="combo-search__info-item">Phó hợp: TP. Hồ Chí Minh</span>
              <span className="combo-search__info-item">Không tại: Khách sạn trứng dụng 3*</span>
              <span className="combo-search__info-item">Phương tiện: Máy bay</span>
            </div>
          </div>
          
          <button className="combo-search__detail-btn">Xem có hiểu</button>
        </div>
      </section>
    </div>
  );
};

export default ComboSearchPage;