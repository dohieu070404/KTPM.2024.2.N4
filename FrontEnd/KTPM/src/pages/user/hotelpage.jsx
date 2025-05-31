// import React, { useState, useEffect } from 'react';
// import './hotelpage.css';
// import GuestSelector from '../../components/designs/GuestSelector';
// import HotelCard from '../../components/designs/HotelCard';
// import ScrollToTop from '../../components/designs/ScrollToTop';

// const HotelPage = () => {
//   // State quản lý filter và search
//   const [filters, setFilters] = useState({
//     priceRange: [0, 3500000],
//     sortBy: 'newest',
//     rating: null,
//     location: 'Phú Quốc',
//     checkIn: '2025-05-21',
//     checkOut: '2025-05-25',
//     guests: { rooms: 1, adults: 1, children: 0 }
//   });

//   // State quản lý dữ liệu và trạng thái
//   const [hotels, setHotels] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedRoom, setSelectedRoom] = useState(null);

//   // Fetch dữ liệu khách sạn
//   useEffect(() => {
//     const controller = new AbortController();
//     const { signal } = controller;

//     const fetchRooms = async () => {
//       try {
//         setLoading(true);

//         const response = await fetch("http://localhost:8080/room/search", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           signal,
//           body: JSON.stringify({
//             location: filters.location,
//             checkInDate: filters.checkIn,
//             checkOutDate: filters.checkOut,
//             maxAdults: filters.guests.adults,
//             maxChildren: filters.guests.children,
//             minPrice: filters.priceRange[0],
//             maxPrice: filters.priceRange[1],
//             rating: filters.rating,
//             sortBy: filters.sortBy,
//           }),
//         });

//         if (!response.ok) {
//           if (response.status === 401) {
//             throw new Error("Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn.");
//           } else {
//             throw new Error("Không thể kết nối đến máy chủ.");
//           }
//         }

//         const data = await response.json();
//         setHotels(data.result);
//         setError(null);
//       } catch (err) {
//         if (err.name !== "AbortError") {
//           console.error("Lỗi khi fetch room:", err);
//           setError(err.message);
//           setHotels([]);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRooms();
//     fetchHotels();
//     return () => controller.abort();
//   }, [filters]);

//   // Xử lý thay đổi filter
//   const handleFilterChange = (name, value) => {
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   // Xử lý submit form tìm kiếm
//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const newFilters = {
//       ...filters,
//       checkIn: formData.get('checkIn'),
//       checkOut: formData.get('checkOut'),
//       guests: {
//         rooms: parseInt(formData.get('rooms')),
//         adults: parseInt(formData.get('adults')),
//         children: parseInt(formData.get('children'))
//       }
//     };
//     setFilters(newFilters);
//   };

//   // Xử lý xem chi tiết phòng
//   const handleViewRooms = async (hotelId) => {
//     try {
//       const response = await fetch(`/api/hotels/${hotelId}/rooms`);
//       const data = await response.json();
//       setSelectedRoom(data);
//     } catch (err) {
//       console.error('Lỗi khi lấy thông tin phòng:', err);
//     }
//   };

//   return (
//     <>
//       <div className="HotelPage-hotel-search-container">
//         <div className="HotelPage-search-header">
//           <h1>KHÁCH SẠN {filters.location.toUpperCase()}</h1>
          
//           <div className='HotelPage-hotel-box-head'>
//             <h3>Thông tin tìm kiếm</h3>
//             <form className="HotelPage-tab-conent-search-form" onSubmit={handleSearchSubmit}>
//               <div className="HotelPage-tab-conent-search-group">
//                 <label>Địa điểm <span>*</span></label>
//                 <input 
//                   type="text" 
//                   className="HotelPage-tab-conent-search-input"
//                   name="location"
//                   value={filters.location}
//                   onChange={(e) => handleFilterChange('location', e.target.value)}
//                   placeholder="Nhập địa điểm..."
//                 />
//               </div>

//               <div className="HotelPage-tab-conent-search-group">
//                 <label>Nhận phòng</label>
//                 <input 
//                   type="date" 
//                   className="HotelPage-tab-conent-date-input"
//                   name="checkIn"
//                   value={filters.checkIn}
//                   onChange={(e) => handleFilterChange('checkIn', e.target.value)}
//                 />
//               </div>

//               <div className="HotelPage-tab-conent-search-group">
//                 <label>Trả phòng</label>
//                 <input 
//                   type="date" 
//                    className="HotelPage-tab-conent-date-input"
//                   name="checkOut"
//                   value={filters.checkOut}
//                   onChange={(e) => handleFilterChange('checkOut', e.target.value)}
//                 />
//               </div>

//               <div className="HotelPage-tab-conent-search-group">
//                 <label>Số khách</label>
//                 <GuestSelector 
//                   initialValues={filters.guests}
//                   onChange={(data) => handleFilterChange('guests', data)}
//                 />
//               </div>

//               <button type="submit" className="HotelPage-tab-conent-search-submit">
//                 Tìm kiếm
//               </button>
//             </form>
//           </div>
//         </div>

//         <div className='hotelpage-visited-search-kq'>
//           {!loading && !error && (
//             `Tìm thấy ${hotels.length} khách sạn phù hợp`
//           )}
//         </div>
//       </div>

//       <div className='HotelPage-hotel-content-container'>
//         <div className="HotelPage-main-content">
//           <div className="HotelPage-filter-section">
//             <div className="HotelPage-filter-group">
//               <h3>BỘ LỌC TÌM KIẾM</h3>
              
//               <div className="HotelPage-filter-item">
//                 <label>Xếp hạng sao:</label>
//                 <div className="star-rating">
//                   {[5, 4, 3, 2, 1].map(star => (
//                     <button
//                       key={star}
//                       className={`star ${filters.rating === star ? 'active' : ''}`}
//                       onClick={() => handleFilterChange('rating', filters.rating === star ? null : star)}
//                     >
//                       {star}★
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="HotelPage-filter-item">
//                 <label>Khoảng giá: {filters.priceRange[1].toLocaleString()} VND</label>
//                 <input 
//                   type="range" 
//                   min="0" 
//                   max="3500000" 
//                   value={filters.priceRange[1]}
//                   onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
//                 />
//                 <div className="HotelPage-price-range">
//                   <span>0 đ</span>
//                   <span>3.500.000 đ</span>
//                 </div>
//               </div>

//               <div className="HotelPage-filter-item">
//                 <label>Sắp xếp theo:</label>
//                 <select 
//                   value={filters.sortBy} 
//                   onChange={(e) => handleFilterChange('sortBy', e.target.value)}
//                 >
//                   <option value="newest">Mới nhất</option>
//                   <option value="priceAsc">Giá tăng dần</option>
//                   <option value="priceDesc">Giá giảm dần</option>
//                   <option value="rating">Đánh giá cao</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className='Hotel-page-container-card'>
//             {loading ? (
//               <div className="hotelpage-loading-indicator">
//                 <div className="hotelpage-spinner"></div>
//                 Đang tải dữ liệu...
//               </div>
//             ) : error ? (
//               <div className="hotelpage-error-message">
//                 ⚠️ {error}
//                 <button 
//                   className="hotelpage-retry-btn"
//                   onClick={() => window.location.reload()}
//                 >
//                   Thử lại
//                 </button>
//               </div>
//             ) : hotels.length === 0 ? (
//               <div className="hotelpage-empty-state">
//                 <img 
//                   src="/assets/koi.jpg" 
//                   alt="Không tìm thấy khách sạn" 
//                   className="empty-state-image"
//                 />
//                 <p className="empty-state-text">Không tìm thấy khách sạn phù hợp</p>
//               </div>
//             ) : (
//               hotels.map((hotel) => (
//                 <HotelCard
//                   key={hotel.id}
//                   {...hotel}
//                   price={hotel.price ? `VND ${hotel.price.toLocaleString()}` : 'Liên hệ'}
//                   onViewRooms={() => handleViewRooms(hotel.id)}
//                 />
//               ))
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Modal chi tiết phòng */}
//       {selectedRoom && (
//         <div className="room-detail-modal">
//           <div className="modal-content">
//             <h3>{selectedRoom.name}</h3>
//             <div className="room-info">
//               <p>Diện tích: {selectedRoom.area}m²</p>
//               <p>Số giường: {selectedRoom.beds}</p>
//               <p>Tiện ích: {selectedRoom.amenities.join(', ')}</p>
//               <p className="price">Giá: {selectedRoom.price.toLocaleString()} VND/đêm</p>
//             </div>
//             <button 
//               className="close-modal"
//               onClick={() => setSelectedRoom(null)}
//             >
//               Đóng
//             </button>
//           </div>
//         </div>
//       )}

//       <ScrollToTop />
//     </>
//   );
// };

// export default HotelPage;
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './hotelpage.css';
import GuestSelector from '../../components/designs/GuestSelector';
import HotelCard from '../../components/designs/HotelCard';
import ScrollToTop from '../../components/designs/ScrollToTop';

const HotelPage = () => {
  const navigate = useNavigate(); // Initialize navigate hook
  
  // State quản lý filter và search
  const [filters, setFilters] = useState({
    priceRange: [0, 3500000],
    sortBy: 'newest',
    rating: null,
    location: '',
    checkIn: '',
    checkOut: '',
    guests: { rooms: 1, adults: 1, children: 0 }
  });

  // State quản lý dữ liệu và trạng thái
  const [allRooms, setAllRooms] = useState([]); // Lưu tất cả dữ liệu từ API
  const [filteredRooms, setFilteredRooms] = useState([]); // Dữ liệu sau khi lọc
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm fetch dữ liệu từ API
  const fetchAllRooms = useCallback(async (signal) => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = 'http://localhost:8080/bookingtravel/room';
      console.log("Calling API:", apiUrl);

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        signal,
      });

      if (!response.ok) {
        throw new Error(`Lỗi mạng: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.code === 1000 && Array.isArray(data.result)) {
        setAllRooms(data.result);
        setFilteredRooms(data.result); // Ban đầu hiển thị tất cả
      } else {
        throw new Error(data.message || 'Phản hồi không hợp lệ từ server.');
      }

    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error("Lỗi khi fetch:", err);
        setError(err.message || "Có lỗi xảy ra khi tải dữ liệu.");
        setAllRooms([]);
        setFilteredRooms([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Hàm lọc dữ liệu
  const filterRooms = useCallback((rooms, filterCriteria) => {
    let filtered = [...rooms];

    // Lọc theo địa điểm
    if (filterCriteria.location && filterCriteria.location.trim()) {
      const locationLower = filterCriteria.location.toLowerCase().trim();
      filtered = filtered.filter(room => 
        (room.name && room.name.toLowerCase().includes(locationLower)) ||
        (room.description && room.description.toLowerCase().includes(locationLower)) ||
        (room.city && room.city.toLowerCase().includes(locationLower))
      );
    }

    // Lọc theo rating
    if (filterCriteria.rating && filterCriteria.rating > 0) {
      filtered = filtered.filter(room => 
        room.rating && Number(room.rating) >= filterCriteria.rating
      );
    }

    // Lọc theo khoảng giá
    if (filterCriteria.priceRange && filterCriteria.priceRange.length === 2) {
      filtered = filtered.filter(room => {
        const price = Number(room.price) || 0;
        return price >= filterCriteria.priceRange[0] && price <= filterCriteria.priceRange[1];
      });
    }

    // Sắp xếp
    switch (filterCriteria.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
        break;
      case 'rating':
        filtered.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
        break;
      case 'name':
        filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      default:
        break;
    }

    return filtered;
  }, []);

  // useEffect để fetch dữ liệu khi component mount
  useEffect(() => {
    const controller = new AbortController();
    fetchAllRooms(controller.signal);
    return () => controller.abort();
  }, [fetchAllRooms]);

  // useEffect để lọc dữ liệu khi filters thay đổi
  useEffect(() => {
    if (allRooms.length > 0) {
      const filtered = filterRooms(allRooms, filters);
      setFilteredRooms(filtered);
      console.log(`Filtered ${filtered.length} hotels from ${allRooms.length} total`);
    }
  }, [allRooms, filters, filterRooms]);

  // Hàm xử lý thay đổi filter
  const handleFilterChange = (name, value) => {
    console.log(`Filter changed: ${name} =`, value);
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Hàm xử lý form search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const searchData = {
      location: formData.get('location') || '',
      checkIn: formData.get('checkIn') || '',
      checkOut: formData.get('checkOut') || '',
    };

    console.log("Search submitted:", searchData);
    
    // Cập nhật filters
    setFilters(prev => ({
      ...prev,
      ...searchData
    }));
  };

  // Hàm reset filters
  const handleResetFilters = () => {
    setFilters({
      priceRange: [0, 3500000],
      sortBy: 'newest',
      rating: null,
      location: '',
      checkIn: '',
      checkOut: '',
      guests: { rooms: 1, adults: 1, children: 0 }
    });
  };

  // Hàm xử lý chuyển trang đặt phòng
  const handleBookRoom = (room) => {
    // Lưu thông tin phòng và booking vào localStorage để OrderPage có thể sử dụng
    const bookingData = {
      room: room,
      checkIn: filters.checkIn,
      checkOut: filters.checkOut,
      guests: filters.guests,
      bookingDate: new Date().toISOString()
    };
    
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    
    // Chuyển đến trang OrderPage
    navigate('/OrderPage', { 
      state: { 
        room: room,
        bookingInfo: bookingData
      } 
    });
  };
  
  return (
    <>
      <div className="HotelPage-hotel-search-container">
        <div className="HotelPage-search-header">
          <h1>DANH SÁCH KHÁCH SẠN</h1>
          <div className="HotelPage-hotel-box-head">
            <h3>Thông tin tìm kiếm</h3>
            <form className="HotelPage-tab-conent-search-form" onSubmit={handleSearchSubmit}>
              <div className="HotelPage-tab-conent-search-group">
                <label>Địa điểm</label>
                <input 
                  type="text" 
                  name="location" 
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  placeholder="Nhập tên khách sạn, thành phố..." 
                />
              </div>
              <div className="HotelPage-tab-conent-search-group">
                <label>Nhận phòng</label>
                <input 
                  type="date" 
                  name="checkIn" 
                  value={filters.checkIn}
                  onChange={(e) => handleFilterChange('checkIn', e.target.value)}
                />
              </div>
              <div className="HotelPage-tab-conent-search-group">
                <label>Trả phòng</label>
                <input 
                  type="date" 
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
              <div className="HotelPage-search-actions">
                <button type="submit" className="HotelPage-tab-conent-search-submit">
                  Tìm kiếm
                </button>
                <button 
                  type="button" 
                  className="HotelPage-reset-btn"
                  onClick={handleResetFilters}
                >
                  Đặt lại
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bộ lọc nâng cao */}
        <div className="HotelPage-filters">
          <div className="filter-row">
            <div className="filter-group">
              <label>Sắp xếp:</label>
              <select 
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              >
                <option value="newest">Mặc định</option>
                <option value="name">Tên A-Z</option>
                <option value="price-low">Giá thấp nhất</option>
                <option value="price-high">Giá cao nhất</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Đánh giá tối thiểu:</label>
              <select 
                value={filters.rating || ''}
                onChange={(e) => handleFilterChange('rating', e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">Tất cả</option>
                <option value="3">3 sao trở lên</option>
                <option value="4">4 sao trở lên</option>
                <option value="5">5 sao</option>
              </select>
            </div>

            <div className="filter-group price-filter">
              <label>Khoảng giá (VND):</label>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Từ"
                  value={filters.priceRange[0]}
                  onChange={(e) => handleFilterChange('priceRange', [Number(e.target.value) || 0, filters.priceRange[1]])}
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Đến"
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value) || 3500000])}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hiển thị kết quả */}
        <div className="hotelpage-visited-search-kq">
          {!loading && (
            <div className="search-results-summary">
              <span>
                Hiển thị {filteredRooms.length} trong tổng số {allRooms.length} khách sạn
              </span>
              {filters.location && (
                <span className="search-keyword">
                  cho "{filters.location}"
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="HotelPage-hotel-content-container">
        <div className="HotelPage-main-content">
          <div className="Hotel-page-container-card">
            {loading ? (
              <div className="hotelpage-loading-indicator">
                <div className="hotelpage-spinner"></div>
                <span>Đang tải danh sách khách sạn...</span>
              </div>
            ) : error ? (
              <div className="hotelpage-error-message">
                <span>⚠️ {error}</span>
                <button onClick={() => fetchAllRooms()}>Thử lại</button>
              </div>
            ) : filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <HotelCard
                  key={room.id}
                  id={room.id}
                  name={room.name}
                  description={room.description}
                  price={`Price:${room.price}`}
                  rating={`Rate:${room.rating}`}
                  availableRooms={`Còn:${room.availableRooms} phòng`}
                  city={`City:${room.city}`}
                  phoneNum={`Phone:${room.phoneNum}`}
                  maxAdults={room.maxAdults}
                  maxChildren={room.maxChildren}
                  imageSrc={room.imageUrl}
                  buttonTitle="Đặt phòng"
                  onViewDetails={() => handleBookRoom(room)} // Chuyển thẳng đến OrderPage
                />
              ))
            ) : (
              <div className="hotelpage-empty-state">
                <div className="empty-content">
                  <h3>
                    {allRooms.length === 0 
                      ? "Không có dữ liệu khách sạn" 
                      : "Không tìm thấy khách sạn phù hợp"
                    }
                  </h3>
                  <p>
                    {allRooms.length === 0
                      ? "Vui lòng thử lại sau."
                      : "Hãy thử điều chỉnh bộ lọc tìm kiếm."
                    }
                  </p>
                  {allRooms.length > 0 && (
                    <button onClick={handleResetFilters} className="reset-btn">
                      Xóa bộ lọc
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ScrollToTop />
    </>
  );
};

export default HotelPage;











