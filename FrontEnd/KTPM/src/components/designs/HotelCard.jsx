import React from 'react';
import './HotelCard.css';

const HotelCard = ({
  title = "Tên combo",
  address = "Địa điểm",
  rating = 0,
  amenities = [],
  price = "Liên hệ",
  imageSrc = "/images/combo-placeholder.jpg",
  onViewRooms = () => {}
}) => {
  return (
    <div className="hotel-card">
      <img 
        src={imageSrc} 
        alt="Combo" 
        className="hotel-card__image" 
      />

      <div className="hotel-card__content">
        <h3 className="hotel-card__title">{title}</h3>
        <p className="hotel-card__address">{address}</p>

        <div className="hotel-card__rating">
          <span className="badge">{rating.toFixed(1)}</span>
          <span className="label">Tốt {rating.toFixed(1)}</span>
        </div>

        <ul className="hotel-card__amenities">
          {amenities.slice(0, 2).map((item, idx) => (
            <li key={idx}>✔ {item}</li>
          ))}
        </ul>

        <div className="hotel-card__price">{price}</div>

        <div className="hotel-card__footer">
          <button className="hotel-card__button" onClick={onViewRooms}>
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
