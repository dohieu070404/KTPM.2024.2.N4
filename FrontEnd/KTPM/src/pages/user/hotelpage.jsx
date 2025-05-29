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
import './hotelpage.css'; // Đảm bảo file CSS tồn tại
import GuestSelector from '../../components/designs/GuestSelector';
import HotelCard from '../../components/designs/HotelCard'; // Đảm bảo HotelCard có thể xử lý các props được truyền
import ScrollToTop from '../../components/designs/ScrollToTop';

const HotelPage = () => {
  // State quản lý filter và search (vẫn giữ để UI không lỗi)
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
  const [rooms, setRooms] = useState([]); // Đổi tên state cho rõ nghĩa hơn
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRoomDetail, setSelectedRoomDetail] = useState(null); // State cho modal chi tiết

  // Hàm fetch dữ liệu tất cả phòng từ API GET /room
  const fetchAllRooms = useCallback(async (signal) => {
    setLoading(true);
    setError(null);
    setRooms([]);

    try {
      const apiUrl = 'http://localhost:8080/bookingtravel/room'; // Sử dụng proxy
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
      console.log("API Response (GET /room):", data);

      // Kiểm tra cấu trúc ApiRespone từ backend
      if (data.code === 1000 && Array.isArray(data.result)) {
        setRooms(data.result); // Cập nhật state rooms
        if (data.result.length === 0) {
           console.log("API trả về danh sách rỗng.");
        }
      } else {
        throw new Error(data.message || 'Không thể lấy dữ liệu phòng.');
      }

    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error("Lỗi khi fetch phòng:", err);
        setError(err.message || "Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại.");
        setRooms([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect để gọi fetchAllRooms một lần khi component mount
  useEffect(() => {
    const controller = new AbortController();
    fetchAllRooms(controller.signal);
    return () => controller.abort();
  }, [fetchAllRooms]);

  // Các hàm xử lý filter và search form chỉ cập nhật UI
  const handleFilterChange = (name, value) => {
    console.log(`Filter changed: ${name} = ${value} (UI only)`);
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert("Chức năng tìm kiếm/lọc hiện không hoạt động trong phiên bản này. Dữ liệu hiển thị là tất cả phòng.");
    const formData = new FormData(e.target);
    console.log("Search form submitted with location:", formData.get('location'), "(API not called)");
  };

  // Hàm xử lý khi nhấn xem chi tiết (hiển thị thông tin đã có)
  const handleViewDetails = (room) => {
    setSelectedRoomDetail(room); // Hiển thị modal với thông tin phòng đã có
  };

  return (
    <>
      {/* Phần UI giữ nguyên nhưng chức năng lọc/tìm kiếm bị vô hiệu hóa */} 
      <div className="HotelPage-hotel-search-container">
        {/* ... phần search header và form ... */} 
         <div className="HotelPage-search-header">
           <h1>DANH SÁCH PHÒNG</h1>
           <div className="HotelPage-hotel-box-head">             <h3>Thông tin tìm kiếm (UI Only)</h3>
             <form className="HotelPage-tab-conent-search-form" onSubmit={handleSearchSubmit}>
               <div className="HotelPage-tab-conent-search-group">
                 <label>Địa điểm</label>
                 <input type="text" name="location" defaultValue={filters.location} placeholder="Nhập thành phố..." />
               </div>
               <div className="HotelPage-tab-conent-search-group">
                 <label>Nhận phòng</label>
                 <input type="date" name="checkIn" defaultValue={filters.checkIn} />
               </div>
               <div className="HotelPage-tab-conent-search-group">
                 <label>Trả phòng</label>
                 <input type="date" name="checkOut" defaultValue={filters.checkOut} />
               </div>
               <div className="HotelPage-tab-conent-search-group">
                 <label>Số khách</label>
                 <GuestSelector initialValues={filters.guests} onChange={(data) => handleFilterChange('guests', data)} />
               </div>
               <button type="submit" className="HotelPage-tab-conent-search-submit">
                 Tìm kiếm (Disabled)
               </button>
             </form>
           </div>
         </div>
         <div className="hotelpage-visited-search-kq">
           {!loading && rooms.length > 0 && (
             `Hiển thị ${rooms.length} phòng`
           )}
         </div>
      </div>

      <div className="HotelPage-hotel-content-container">
        <div className="HotelPage-main-content">
          {/* Phần bộ lọc bên trái (UI Only) */} 
          <div className="HotelPage-filter-section">
             {/* ... phần bộ lọc ... */} 
            <div className="HotelPage-filter-group">
              <h3>BỘ LỌC (UI Only)</h3>
              <div className="HotelPage-filter-item">
                <label>Xếp hạng sao:</label>
                <div className="star-rating">
                  {[5, 4, 3, 2, 1].map(star => (
                    <button key={star} className={`star ${filters.rating === star ? 'active' : ''}`} onClick={() => handleFilterChange('rating', filters.rating === star ? null : star)}>{star}★</button>
                  ))}
                </div>
              </div>
              <div className="HotelPage-filter-item">
                <label>Giá tối đa: {filters.priceRange[1].toLocaleString()} VND</label>
                <input type="range" min="0" max="5000000" step="100000" value={filters.priceRange[1]} onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])} />
                <div className="HotelPage-price-range"><span>0 đ</span><span>5.000.000+ đ</span></div>
              </div>
              <div className="HotelPage-filter-item">
                <label>Sắp xếp theo:</label>
                <select value={filters.sortBy} onChange={(e) => handleFilterChange('sortBy', e.target.value)}>
                  <option value="newest">Mới nhất</option>
                  <option value="priceAsc">Giá tăng dần</option>
                  <option value="priceDesc">Giá giảm dần</option>
                  <option value="ratingDesc">Đánh giá cao</option>
                </select>
              </div>
            </div>
          </div>

          {/* Phần hiển thị danh sách phòng */} 
          <div className="Hotel-page-container-card">
            {loading ? (
              <div className="hotelpage-loading-indicator"><div className="hotelpage-spinner"></div>Đang tải danh sách phòng...</div>
            ) : error ? (
              <div className="hotelpage-error-message">⚠️ {error}</div>
            ) : rooms.length > 0 ? (
              // *** SỬA ĐỔI: Truyền đúng props vào HotelCard ***
          
              rooms.map((room) => (
                <HotelCard
                  key={room.id} // Sử dụng ID của phòng
                  id={room.id} // Truyền ID nếu HotelCard cần
                  name={room.name} // Truyền tên phòng
                  description={room.description} // Truyền mô tả
                  // Giả sử HotelCard có thể hiển thị các props này
                  // Nếu HotelCard cần ảnh, rating, location,... bạn cần thêm vào đây hoặc sửa HotelCard
                  imageSrc={room.imageUrl} // Ví dụ ảnh mặc định
                  
                  // rating={room.rating || 0} // Ví dụ rating mặc định
                  price={room.price ? `VND ${room.price.toLocaleString()}` : 'Liên hệ'} // Truyền giá phòng
                  // Thay đổi onViewRooms thành onViewDetails hoặc tương tự nếu cần
                  onViewRooms={() => handleViewDetails(room)} // Gọi hàm xem chi tiết với thông tin phòng
                  // Truyền thêm các props khác nếu HotelCard cần và có trong 'room'
                  maxAdults={room.maxAdults}
                  maxChildren={room.maxChildren}
                  availableRooms={room.availableRooms}
                />
              ))
            ) : (
              <div className="hotelpage-empty-state">
                {!error && <p className="empty-state-text">Không có phòng nào được trả về.</p>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal chi tiết phòng */} 
      {selectedRoomDetail && (
        <div className="room-detail-modal">
           <div className="modal-content">
             <h3>{selectedRoomDetail.name}</h3>
             <p>{selectedRoomDetail.description}</p>
             <p>Giá: {selectedRoomDetail.price ? `${selectedRoomDetail.price.toLocaleString()} VND/đêm` : 'Liên hệ'}</p>
             <p>Số người lớn tối đa: {selectedRoomDetail.maxAdults}</p>
             <p>Số trẻ em tối đa: {selectedRoomDetail.maxChildren}</p>
             <p>Số phòng trống: {selectedRoomDetail.availableRooms}</p>
             {/* Thêm các thông tin khác nếu cần */} 
             <button className="close-modal" onClick={() => setSelectedRoomDetail(null)}>Đóng</button>
           </div>
        </div>
      )}

      <ScrollToTop />
    </>
  );
};

export default HotelPage;











