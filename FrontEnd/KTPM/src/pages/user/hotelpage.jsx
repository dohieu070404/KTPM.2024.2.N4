import React from 'react';
import { useState, useEffect } from 'react'; 
import './hotelpage.css';
import GuestSelector from '../../components/designs/GuestSelector';

import HotelCard from '../../components/designs/HotelCard';
import ScrollToTop from '../../components/designs/ScrollToTop';

const HotelPage = () => {
  const [priceRange, setPriceRange] = useState([0, 3500000]);
  const [sortBy, setSortBy] = useState('newest');
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  return (
    <>
    
    <div className="HotelPage-hotel-search-container">
      {/* Phần header */}
      <div className="HotelPage-search-header">
        <h1>KHÁCH SẠN PHÚ QUỐC</h1>
        <div className='HotelPage-hotel-box-head'>
            <h3>Thông tin khách sạn: </h3>
        <form className="HotelPage-tab-conent-search-form">
            <div className="HotelPage-tab-conent-search-group">
              <label>Địa điểm ? <span>*</span></label>
              <input 
                type="text" 
                className="HotelPage-tab-conent-search-input" 
                placeholder="Khách sạn, địa đến, thành phô "
              />
            </div>

            <div className="HotelPage-tab-conent-search-group">
              <label>Nhận phòng </label>
              <input 
                type="date" 
                className="HotelPage-tab-conent-date-input"
                defaultValue="2025-05-21" // Thay value bằng defaultValue
              />
            </div>
            <div className="HotelPage-tab-conent-search-group">
              <label>Trả phòng </label>
              <input 
                type="date" 
                className="HotelPage-tab-conent-date-input"
                defaultValue="2025-05-21" // Thay value bằng defaultValue
              />
            </div>

           <div className="HotelPage-tab-conent-search-group">
              <label>Số khách</label>
              <GuestSelector 
                rooms={1} 
                adults={1} 
                children={0} 
                onChange={(data) => console.log(data)}
              />
            </div>

             <button type="submit" className="HotelPage-tab-conent-search-submit">
              Tìm kiếm
            </button>
          </form>
          </div>
      </div>

       <div className='hotelpage-visited-search-kq'>
        Dia diem: tim thay bao nhieu cho
        </div>
</div>

     

<div className='HotelPage-hotel-content-container'>
      <div className="HotelPage-main-content">
        {/* Phần bộ lọc */}
        <div className="HotelPage-filter-section">
          <div className="HotelPage-filter-group">
            <h3>BỘ LỌC TÌM KIẾM</h3>
            <div className="HotelPage-filter-item">
              <span>Xếp hạng sao:</span>
              <button className="HotelPage-clear-btn">Xóa</button>
            </div>
            
            <div className="HotelPage-filter-item">
              <label>Ngân sách</label>
              <input 
                type="range" 
                min="0" 
                max="3500000" 
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, e.target.value])}
              />
              <div className="HotelPage-price-range">
                <span>0 đ</span>
                <span>15.000.000 đ</span>
              </div>
            </div>

            <div className="HotelPage-filter-item">
              <label>Sắp xếp theo:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="newest">Khách sạn mới nhất</option>
                <option value="price">Giá thấp nhất</option>
              </select>
            </div>
          </div>
        </div>

        {/* Danh sách khách sạn */}
        {/* <div className="HotelPage-hotel-list">
          {hotels.map((hotel, index) => (
            <div key={index} className="HotelPage-hotel-card">
              <h3>{hotel.name}</h3>
              <p className="HotelPage-address">{hotel.address}</p>
              
              {hotel.price ? (
                <div className="HotelPage-price-info">
                  <span className="HotelPage-price">{hotel.price.toLocaleString()} đ</span>
                  <p className="HotelPage-tax-info">Giá đã bao gồm thuế và phí</p>
                </div>
              ) : (
                <button className="HotelPage-view-room-btn">Xem phòng</button>
              )}
            </div>
          ))}
        </div> */}

        <div className='Hotel-page-container-card'> 
         {hotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                imageSrc={hotel.imageUrl || "/assets/HaNoi.jpg"}
                imageAlt={hotel.name}
                title={hotel.name}
                address={hotel.address}
                rating={hotel.rating}
                reviews={hotel.reviews}
                price={`VND ${hotel.price?.toLocaleString() ?? 'Liên hệ'}`}
                roomType={hotel.roomType}
                bedDetails={hotel.bedDetails}
                amenities={hotel.amenities}
                roomsLeft={hotel.roomsLeft}
                onViewRooms={() => console.log('Xem phòng', hotel.id)}
              />
            ))}
          
      </div>

      </div>
</div>
    <ScrollToTop />
    </>
  );
};

export default HotelPage;