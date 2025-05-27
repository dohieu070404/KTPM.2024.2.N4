import React, { useState, useEffect } from 'react';
import './hotelpage.css';
import GuestSelector from '../../components/designs/GuestSelector';
import HotelCard from '../../components/designs/HotelCard';
import ScrollToTop from '../../components/designs/ScrollToTop';

const HotelPage = () => {
  // State quản lý filter và search
  const [filters, setFilters] = useState({
    priceRange: [0, 3500000],
    sortBy: 'newest',
    rating: null,
    location: 'Phú Quốc',
    checkIn: '2025-05-21',
    checkOut: '2025-05-25',
    guests: { rooms: 1, adults: 1, children: 0 }
  });

  // State quản lý dữ liệu và trạng thái
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Fetch dữ liệu khách sạn
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchHotels = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({
          minPrice: filters.priceRange[0],
          maxPrice: filters.priceRange[1],
          sortBy: filters.sortBy,
          rating: filters.rating || '',
          location: filters.location
        });

        const response = await fetch(`http://localhost:8080/bookingtravel/hotel${queryParams}`, { signal });
        if (!response.ok) throw new Error('Không thể kết nối đến máy chủ');
        const data = await response.json();
        setHotels(data);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setHotels([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
    return () => controller.abort();
  }, [filters]);

  // Xử lý thay đổi filter
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Xử lý submit form tìm kiếm
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newFilters = {
      ...filters,
      checkIn: formData.get('checkIn'),
      checkOut: formData.get('checkOut'),
      guests: {
        rooms: parseInt(formData.get('rooms')),
        adults: parseInt(formData.get('adults')),
        children: parseInt(formData.get('children'))
      }
    };
    setFilters(newFilters);
  };

  // Xử lý xem chi tiết phòng
  const handleViewRooms = async (hotelId) => {
    try {
      const response = await fetch(`/api/hotels/${hotelId}/rooms`);
      const data = await response.json();
      setSelectedRoom(data);
    } catch (err) {
      console.error('Lỗi khi lấy thông tin phòng:', err);
    }
  };

  return (
    <>
      <div className="HotelPage-hotel-search-container">
        <div className="HotelPage-search-header">
          <h1>KHÁCH SẠN {filters.location.toUpperCase()}</h1>
          
          <div className='HotelPage-hotel-box-head'>
            <h3>Thông tin tìm kiếm</h3>
            <form className="HotelPage-tab-conent-search-form" onSubmit={handleSearchSubmit}>
              <div className="HotelPage-tab-conent-search-group">
                <label>Địa điểm <span>*</span></label>
                <input 
                  type="text" 
                  className="HotelPage-tab-conent-search-input"
                  name="location"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  placeholder="Nhập địa điểm..."
                />
              </div>

              <div className="HotelPage-tab-conent-search-group">
                <label>Nhận phòng</label>
                <input 
                  type="date" 
                  className="HotelPage-tab-conent-date-input"
                  name="checkIn"
                  value={filters.checkIn}
                  onChange={(e) => handleFilterChange('checkIn', e.target.value)}
                />
              </div>

              <div className="HotelPage-tab-conent-search-group">
                <label>Trả phòng</label>
                <input 
                  type="date" 
                   className="HotelPage-tab-conent-date-input"
                  name="checkOut"
                  value={filters.checkOut}
                  onChange={(e) => handleFilterChange('checkOut', e.target.value)}
                />
              </div>

              <div className="HotelPage-tab-conent-search-group">
                <label>Số khách</label>
                <GuestSelector 
                  initialValues={filters.guests}
                  onChange={(data) => handleFilterChange('guests', data)}
                />
              </div>

              <button type="submit" className="HotelPage-tab-conent-search-submit">
                Tìm kiếm
              </button>
            </form>
          </div>
        </div>

        <div className='hotelpage-visited-search-kq'>
          {!loading && !error && (
            `Tìm thấy ${hotels.length} khách sạn phù hợp`
          )}
        </div>
      </div>

      <div className='HotelPage-hotel-content-container'>
        <div className="HotelPage-main-content">
          <div className="HotelPage-filter-section">
            <div className="HotelPage-filter-group">
              <h3>BỘ LỌC TÌM KIẾM</h3>
              
              <div className="HotelPage-filter-item">
                <label>Xếp hạng sao:</label>
                <div className="star-rating">
                  {[5, 4, 3, 2, 1].map(star => (
                    <button
                      key={star}
                      className={`star ${filters.rating === star ? 'active' : ''}`}
                      onClick={() => handleFilterChange('rating', filters.rating === star ? null : star)}
                    >
                      {star}★
                    </button>
                  ))}
                </div>
              </div>

              <div className="HotelPage-filter-item">
                <label>Khoảng giá: {filters.priceRange[1].toLocaleString()} VND</label>
                <input 
                  type="range" 
                  min="0" 
                  max="3500000" 
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                />
                <div className="HotelPage-price-range">
                  <span>0 đ</span>
                  <span>3.500.000 đ</span>
                </div>
              </div>

              <div className="HotelPage-filter-item">
                <label>Sắp xếp theo:</label>
                <select 
                  value={filters.sortBy} 
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                >
                  <option value="newest">Mới nhất</option>
                  <option value="priceAsc">Giá tăng dần</option>
                  <option value="priceDesc">Giá giảm dần</option>
                  <option value="rating">Đánh giá cao</option>
                </select>
              </div>
            </div>
          </div>

          <div className='Hotel-page-container-card'>
            {loading ? (
              <div className="hotelpage-loading-indicator">
                <div className="hotelpage-spinner"></div>
                Đang tải dữ liệu...
              </div>
            ) : error ? (
              <div className="hotelpage-error-message">
                ⚠️ {error}
                <button 
                  className="hotelpage-retry-btn"
                  onClick={() => window.location.reload()}
                >
                  Thử lại
                </button>
              </div>
            ) : hotels.length === 0 ? (
              <div className="hotelpage-empty-state">
                <img 
                  src="/assets/koi.jpg" 
                  alt="Không tìm thấy khách sạn" 
                  className="empty-state-image"
                />
                <p className="empty-state-text">Không tìm thấy khách sạn phù hợp</p>
              </div>
            ) : (
              hotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  {...hotel}
                  price={hotel.price ? `VND ${hotel.price.toLocaleString()}` : 'Liên hệ'}
                  onViewRooms={() => handleViewRooms(hotel.id)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal chi tiết phòng */}
      {selectedRoom && (
        <div className="room-detail-modal">
          <div className="modal-content">
            <h3>{selectedRoom.name}</h3>
            <div className="room-info">
              <p>Diện tích: {selectedRoom.area}m²</p>
              <p>Số giường: {selectedRoom.beds}</p>
              <p>Tiện ích: {selectedRoom.amenities.join(', ')}</p>
              <p className="price">Giá: {selectedRoom.price.toLocaleString()} VND/đêm</p>
            </div>
            <button 
              className="close-modal"
              onClick={() => setSelectedRoom(null)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      <ScrollToTop />
    </>
  );
};

export default HotelPage;