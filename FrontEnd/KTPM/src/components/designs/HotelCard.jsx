import React from 'react';
import './HotelCard.css';

const HotelCard = ({
  title,
  address,
  rating,
  reviews,
  roomType,
  bedDetails,
  amenities,
  roomsLeft,
  nights,
  guests,
  price,
  imageSrc,
  imageAlt = 'Hotel image',
  onViewRooms
}) => {
  return (
    <div className="hotel-card">
      {imageSrc && (
        <div className="hotel-card__image-container">
          <img 
            src={imageSrc} 
            alt={imageAlt}
            className="hotel-card__image" 
          />
        </div>
      )}
      
      <div className="hotel-card__content">
        <div className="hotel-card__header">
          <h2 className="hotel-card__title">{title}</h2>
          <p className="hotel-card__address">{address}</p>
        </div>

      <div className="hotel-card-rating-section">
        <span className="hotel-card-rating-badge">{rating}</span>
        <span className="hotel-card-rating-text">Tốt {rating}</span>
        <span className="hotel-card-reviews-count">{reviews} đánh giá</span>
      </div>

      <div className="hotel-card-room-details">
        <h3 className="hotel-card-room-type">{roomType}</h3>
        <p className="hotel-card-bed-info">{bedDetails}</p>
        <div className="hotel-card-amenities-list">
          {amenities.map((amenity, index) => (
            <div key={index} className="hotel-card-amenity-item">
              <span className="hotel-card-check-icon">✔</span>
              {amenity}
            </div>
          ))}
        </div>
      </div>

      {roomsLeft > 0 && (
        <div className="hotel-card-rooms-left-alert">
          Chỉ còn {roomsLeft} phòng với giá này trên trang chúng tôi
        </div>
      )}

      <div className="hotel-card-price-section">
        <div className="hotel-card-stay-info">
          {nights} đêm, {guests}
        </div>
        <div className="hotel-card-price-container">
          <span className="hotel-card-price">{price}</span>
          <span className="hotel-card-tax-info">Đã bao gồm thuế và phí</span>
        </div>
      </div>

      <button className="hotel-card-view-rooms-btn" onClick={onViewRooms}>
        Xem chỗ trống
      </button>
    </div>
    </div>
    
  );
};

HotelCard.defaultProps = {
  amenities: [],
  roomsLeft: 0
};

export default HotelCard;
