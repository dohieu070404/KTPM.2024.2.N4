// import React from 'react';
// import './HotelCard.css';

// const HotelCard = ({
//   title,
//   address,
//   rating,
//   reviews,
//   roomType,
//   bedDetails,
//   amenities,
//   roomsLeft,
//   nights,
//   guests,
//   price,
//   imageSrc,
//   imageAlt = 'Hotel image',
//   onViewRooms
// }) => {
//   return (
//     <div className="hotel-card">
//       {imageSrc && (
//         <div className="hotel-card__image-container">
//           <img 
//             src={imageSrc} 
//             alt={imageAlt}
//             className="hotel-card__image" 
//           />
//         </div>
//       )}
      
//       <div className="hotel-card__content">
//         <div className="hotel-card__header">
//           <h2 className="hotel-card__title">{title}</h2>
//           <p className="hotel-card__address">{address}</p>
//         </div>

//       <div className="hotel-card-rating-section">
//         <span className="hotel-card-rating-badge">{rating}</span>
//         <span className="hotel-card-rating-text">Tốt {rating}</span>
//         <span className="hotel-card-reviews-count">{reviews} đánh giá</span>
//       </div>

//       <div className="hotel-card-room-details">
//         <h3 className="hotel-card-room-type">{roomType}</h3>
//         <p className="hotel-card-bed-info">{bedDetails}</p>
//         <div className="hotel-card-amenities-list">
//           {amenities.map((amenity, index) => (
//             <div key={index} className="hotel-card-amenity-item">
//               <span className="hotel-card-check-icon">✔</span>
//               {amenity}
//             </div>
//           ))}
//         </div>
//       </div>

//       {roomsLeft > 0 && (
//         <div className="hotel-card-rooms-left-alert">
//           Chỉ còn {roomsLeft} phòng với giá này trên trang chúng tôi
//         </div>
//       )}

//       <div className="hotel-card-price-section">
//         <div className="hotel-card-stay-info">
//           {nights} đêm, {guests}
//         </div>
//         <div className="hotel-card-price-container">
//           <span className="hotel-card-price">{price}</span>
//           <span className="hotel-card-tax-info">Đã bao gồm thuế và phí</span>
//         </div>
//       </div>

//       <button className="hotel-card-view-rooms-btn" onClick={onViewRooms}>
//         Xem chỗ trống
//       </button>
//     </div>
//     </div>
    
//   );
// };

// HotelCard.defaultProps = {
//   amenities: [],
//   roomsLeft: 0
// };

// export default HotelCard;







import React from 'react';
import './HotelCard.css'; // Đảm bảo bạn có file CSS này và cập nhật nếu cần

// Sửa lại props để khớp với dữ liệu phòng từ API GET /room
const HotelCard = ({
  id, // Thêm ID nếu cần
  name, // Tên phòng (thay cho title)
  description, // Mô tả phòng
  price, // Giá phòng
  rating,
  city,
  phoneNum,
  availableRooms, // Số phòng trống (thay cho roomsLeft)
  maxAdults, // Số người lớn tối đa
  maxChildren, // Số trẻ em tối đa
  // Bỏ các props không có trong dữ liệu phòng: 
  // address, rating, reviews, roomType, bedDetails, amenities, nights, guests
  imageSrc, // Sử dụng ảnh mặc định nếu không có
  imageAlt = 'Room image',
  buttonTitle,
  onViewDetails
}) => {

  // Format giá tiền
  const formattedPrice = price ? `${price.toLocaleString()}` : 'Liên hệ';

  return (
    <div className="hotel-card"> 
      {/* Phần ảnh (sử dụng ảnh mặc định) */} 
      <div className="hotel-card__image-container">
        <img 
          src={imageSrc} 
          alt={imageAlt}
          className="hotel-card__image" 
        />
      </div>
      
      <div className="hotel-card__content">
        {/* Phần tiêu đề: Hiển thị tên phòng */} 
        <div className="hotel-card__header">
          <h2 className="hotel-card__title">{name || 'Tên phòng không xác định'}</h2>
          {/* Bỏ địa chỉ vì không có trong dữ liệu phòng */} 
          {/* <p className="hotel-card__address">{address}</p> */} 
        </div>

        {/* Bỏ phần rating vì không có dữ liệu */} 
        {/* <div className="hotel-card-rating-section"> ... </div> */}

        {/* Phần chi tiết phòng: Hiển thị mô tả và thông tin cơ bản */} 
        <div className="hotel-card-room-details">
          {description && <p className="hotel-card-description">{description}</p>}
          {city && <p className="hotel-card-description">{city}</p>}
          {/* Hiển thị thông tin số người */} 
          <p className="hotel-card-rooms-left-alert">
            {rating}
          </p>
          <p className="hotel-card-rooms-left-alert">
            {availableRooms}
          </p>
          {/* Bỏ phần amenities vì không có trong dữ liệu */} 
          {/* <div className="hotel-card-amenities-list"> ... </div> */} 
        </div>

        {/* Thông báo số phòng còn lại */} 

          <div className="hotel-card-rooms-left-alert">
            {price}
          </div>
        {/* Phần giá */} 
        <div className="hotel-card-price-section">
           {/* Bỏ thông tin số đêm/khách vì không áp dụng cho từng phòng */} 
          {/* <div className="hotel-card-stay-info"> ... </div> */} 
          <div className="hotel-card-price-container">
            <span className="hotel-card-price">{phoneNum}</span>
            <span className="hotel-card-tax-info"></span>
          </div>
        </div>

        {/* Nút xem chi tiết */} 
        <button className="hotel-card-view-rooms-btn" onClick={onViewDetails}>
          {buttonTitle}
        </button>
      </div>
    </div>
  );
};

// Có thể bỏ defaultProps nếu không cần thiết nữa
// HotelCard.defaultProps = {
//   amenities: [], 
// };

export default HotelCard;

