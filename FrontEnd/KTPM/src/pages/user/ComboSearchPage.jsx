import React, { useState, useEffect } from 'react';
import './ComboSearchPage.css';
import HotelCard from '../../components/designs/HotelCard';
// import LoadingSpinner from '../../components/designs/LoadingSpinner';
// import ErrorMessage from '../../components/designs/ErrorMessage';

const ComboSearchPage = () => {
  const [comboDeals, setComboDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const [filters, setFilters] = useState({
    transport: [],
    priceRange: [],
    sortBy: 'priceAsc',
    destination: '',
  });

  const LoadingSpinner = () => (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Đang tải dữ liệu...</p>
    </div>
  );

  // Tạo error message trực tiếp
  const ErrorMessage = ({ message, onRetry }) => (
    <div className="error-message">
      <div className="error-icon">⚠️</div>
      <div className="error-content">
        <h3>Có lỗi xảy ra!</h3>
        <p>{message}</p>
        <button onClick={onRetry} className="retry-button">
          Thử lại
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fakeData = [
      {
        id: 1,
        imageUrl: 'public/assets/PhuQuoc.webp',
        title: 'Phú Quốc 3N2Đ - Vé máy bay + 2 đêm khách sạn 3*',
        price: 3590000,
        location: 'Phú Quốc',
        rating: 4.5,
        amenities: ['Wifi', 'Ăn sáng miễn phí'],
        transportType: 'Máy bay'
      },
      {
        id: 2,
        imageUrl: 'public/assets/NhaTrang.avif',
        title: 'Nha Trang 3N2Đ - Xe giường nằm + 2 đêm khách sạn 4*',
        price: 1290000,
        location: 'Nha Trang',
        rating: 4.2,
        amenities: ['Gần biển', 'Hồ bơi'],
        transportType: 'Xe'
      },
      {
        id: 3,
        imageUrl: 'public/assets/DaLat.jpg',
        title: 'Đà Lạt 3N2Đ - Xe khứ hồi + 2 đêm homestay xinh xắn',
        price: 990000,
        location: 'Đà Lạt',
        rating: 4.0,
        amenities: ['Check-in đẹp', 'BBQ ngoài trời'],
        transportType: 'Xe'
      },
      {
        id: 4,
        imageUrl: 'public/assets/HoiAn.jpg',
        title: 'Hội An 3N2Đ - Vé máy bay + resort 4 sao gần phố cổ',
        price: 2290000,
        location: 'Hội An',
        rating: 4.3,
        amenities: ['Xe đưa đón', 'Buffet sáng'],
        transportType: 'Máy bay'
      },
      {
        id: 5,
        imageUrl: 'public/assets/ConDao.webp',
        title: 'Côn Đảo 2N1Đ - Máy bay khứ hồi + khách sạn gần biển',
        price: 4790000,
        location: 'Côn Đảo',
        rating: 4.6,
        amenities: ['Gần bãi tắm', 'Xe đạp miễn phí'],
        transportType: 'Máy bay'
      },
      {
        id: 6,
        imageUrl: 'public/assets/HaLong.avif',
        title: 'Hạ Long 3N2Đ - Du thuyền 5 sao + bữa tối trên vịnh',
        price: 5190000,
        location: 'Hạ Long',
        rating: 4.7,
        amenities: ['Du thuyền cao cấp', 'Bữa tối BBQ'],
        transportType: 'Du thuyền'
      },
      {
        id: 7,
        imageUrl: 'public/assets/QuyNhon.webp',
        title: 'Quy Nhơn 4N3Đ - Xe limousine + khách sạn trung tâm',
        price: 2090000,
        location: 'Quy Nhơn',
        rating: 4.1,
        amenities: ['Gần biển', 'Hồ bơi vô cực'],
        transportType: 'Xe'
      },
      {
        id: 8,
        imageUrl: 'public/assets/Sapa.png',
        title: 'Sapa 3N2Đ - Tàu hỏa giường nằm + homestay view núi',
        price: 1790000,
        location: 'Sapa',
        rating: 4.4,
        amenities: ['View núi đẹp', 'Chợ đêm'],
        transportType: 'Tàu hoả'
      },
      {
        id: 9,
        imageUrl: 'public/assets/VungTau.jpg',
        title: 'Vũng Tàu 2N1Đ - Xe đưa đón + khách sạn 3* gần biển',
        price: 890000,
        location: 'Vũng Tàu',
        rating: 3.9,
        amenities: ['Bãi biển riêng', 'Ăn sáng miễn phí'],
        transportType: 'Xe'
      },
      {
        id: 10,
        imageUrl: 'public/assets/MuiNe.jpeg',
        title: 'Mũi Né 3N2Đ - Xe khứ hồi + resort 4 sao ven biển',
        price: 2590000,
        location: 'Mũi Né',
        rating: 4.2,
        amenities: ['Hồ bơi', 'Spa thư giãn'],
        transportType: 'Xe'
      }
    ];


    setTimeout(() => {
      setComboDeals(fakeData);
      setLoading(false);
    }, 800);
  }, [filters, retryCount]);

  const handleTransportChange = (type) => {
    setFilters(prev => ({
      ...prev,
      transport: prev.transport.includes(type)
        ? prev.transport.filter(t => t !== type)
        : [...prev.transport, type]
    }));
  };

  const handleBudgetChange = (range) => {
    const ranges = {
      'Dưới 5 triệu': [0, 5000000],
      'Từ 5 - 10 triệu': [5000000, 10000000],
      'Từ 10 - 20 triệu': [10000000, 20000000],
      'Trên 20 triệu': [20000000, 100000000]
    };

    setFilters(prev => {
      const selected = ranges[range];
      const isActive = prev.priceRange.join(',') === selected.join(',');

      return {
        ...prev,
        priceRange: isActive ? [0, 100000000] : selected
      };
    });
  };


  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  return (
    <div className="combo-search">
      <h1 className="combo-search__main-title">COMBO GIÁ TỐT TẠI VIVUGO</h1>

      <aside className="combo-search__filters">
        <h2 className="combo-search__section-title">BỘ LỌC</h2>
        <div className="combo-search__filter-group">
          <h3 className="combo-search__filter-label">Điểm khởi hành</h3>
          <select className="combo-search__dropdown">
            <option value="">Tất cả</option>
            <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
            <option value="Cần Thơ">Cần Thơ</option>
            <option value="Nha Trang">Nha Trang</option>
            <option value="Phú Quốc">Phú Quốc</option>
            <option value="Huế">Huế</option>
            <option value="Hội An">Hội An</option>
            <option value="Vũng Tàu">Vũng Tàu</option>
            <option value="Đà Lạt">Đà Lạt</option>
            <option value="Quy Nhơn">Quy Nhơn</option>
            <option value="Hạ Long">Hạ Long</option>
            <option value="Phan Thiết">Phan Thiết</option>
            <option value="Côn Đảo">Côn Đảo</option>
            <option value="Sapa">Sapa</option>
            <option value="Mũi Né">Mũi Né</option>
            <option value="Ninh Bình">Ninh Bình</option>
            <option value="Cát Bà">Cát Bà</option>
            <option value="Hà Giang">Hà Giang</option>
            <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
            <option value="Kiên Giang">Kiên Giang</option>
            <option value="Bắc Ninh">Bắc Ninh</option>
            <option value="Thừa Thiên - Huế">Thừa Thiên - Huế</option>
            <option value="Thanh Hóa">Thanh Hóa</option>
            <option value="Quảng Ninh">Quảng Ninh</option>
            <option value="Hải Phòng">Hải Phòng</option>
            <option value="Bình Thuận">Bình Thuận</option>
            <option value="Lâm Đồng">Lâm Đồng</option>
            <option value="Gia Lai">Gia Lai</option>
            <option value="Kon Tum">Kon Tum</option>
            <option value="Đắk Lắk">Đắk Lắk</option>
            <option value="Đắk Nông">Đắk Nông</option>
            <option value="Tây Ninh">Tây Ninh</option>
            <option value="Bình Dương">Bình Dương</option>
            <option value="Long An">Long An</option>
            <option value="Tiền Giang">Tiền Giang</option>
            <option value="Bến Tre">Bến Tre</option>
            <option value="Trà Vinh">Trà Vinh</option>
            <option value="Vĩnh Long">Vĩnh Long</option>
            <option value="Cà Mau">Cà Mau</option>
            <option value="Sóc Trăng">Sóc Trăng</option>
            <option value="Hậu Giang">Hậu Giang</option>
            <option value="An Giang">An Giang</option>
            <option value="Đồng Tháp">Đồng Tháp</option>
            <option value="Bạc Liêu">Bạc Liêu</option>
            <option value="Ninh Thuận">Ninh Thuận</option>
            <option value="Phú Yên">Phú Yên</option>
            <option value="Quảng Bình">Quảng Bình</option>
            <option value="Quảng Trị">Quảng Trị</option>
            <option value="Hà Tĩnh">Hà Tĩnh</option>
            <option value="Nghệ An">Nghệ An</option>
            <option value="Lào Cai">Lào Cai</option>
            <option value="Yên Bái">Yên Bái</option>
            <option value="Tuyên Quang">Tuyên Quang</option>
            <option value="Hòa Bình">Hòa Bình</option>
            <option value="Phú Thọ">Phú Thọ</option>
            <option value="Bắc Giang">Bắc Giang</option>
            <option value="Hưng Yên">Hưng Yên</option>
            <option value="Nam Định">Nam Định</option>
            <option value="Thái Bình">Thái Bình</option>
            <option value="Hải Dương">Hải Dương</option>
            <option value="Bắc Kạn">Bắc Kạn</option> 
          </select>
        </div>

        <div className="combo-search__filter-group">
          <h3 className="combo-search__filter-label">Điểm đến</h3>
          <select className="combo-search__dropdown"
            value={filters.destination}
            onChange={(e) => setFilters(prev => ({ ...prev, destination: e.target.value }))}
          > 
            <option value="">Tất cả</option>
            <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
            <option value="Cần Thơ">Cần Thơ</option>
            <option value="Phú Quốc">Phú Quốc</option>
            <option value="Nha Trang">Nha Trang</option>
            <option value="Hội An">Hội An</option>
            <option value="Huế">Huế</option>
            <option value="Vũng Tàu">Vũng Tàu</option>
            <option value="Đà Lạt">Đà Lạt</option>
            <option value="Quy Nhơn">Quy Nhơn</option>
            <option value="Hạ Long">Hạ Long</option>
            <option value="Phan Thiết">Phan Thiết</option>
            <option value="Côn Đảo">Côn Đảo</option>
            <option value="Sapa">Sapa</option>
            <option value="Mũi Né">Mũi Né</option>
            <option value="Ninh Bình">Ninh Bình</option>
            <option value="Cát Bà">Cát Bà</option>
            <option value="Hà Giang">Hà Giang</option>
            <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
            <option value="Kiên Giang">Kiên Giang</option>
            <option value="Bắc Ninh">Bắc Ninh</option>
            <option value="Thừa Thiên - Huế">Thừa Thiên - Huế</option>
            <option value="Thanh Hóa">Thanh Hóa</option>
            <option value="Quảng Ninh">Quảng Ninh</option>
            <option value="Hải Phòng">Hải Phòng</option>
            <option value="Bình Thuận">Bình Thuận</option>
            <option value="Lâm Đồng">Lâm Đồng</option>
            <option value="Gia Lai">Gia Lai</option>
            <option value="Kon Tum">Kon Tum</option>
            <option value="Đắk Lắk">Đắk Lắk</option>
            <option value="Đắk Nông">Đắk Nông</option>
            <option value="Tây Ninh">Tây Ninh</option>
            <option value="Bình Dương">Bình Dương</option>
            <option value="Long An">Long An</option>
            <option value="Tiền Giang">Tiền Giang</option>
            <option value="Bến Tre">Bến Tre</option>
            <option value="Trà Vinh">Trà Vinh</option>
            <option value="Vĩnh Long">Vĩnh Long</option>
            <option value="Cà Mau">Cà Mau</option>
            <option value="Sóc Trăng">Sóc Trăng</option>
            <option value="Hậu Giang">Hậu Giang</option>
            <option value="An Giang">An Giang</option>
            <option value="Đồng Tháp">Đồng Tháp</option>
            <option value="Bạc Liêu">Bạc Liêu</option>
            <option value="Ninh Thuận">Ninh Thuận</option>
            <option value="Phú Yên">Phú Yên</option>
            <option value="Quảng Bình">Quảng Bình</option>
            <option value="Quảng Trị">Quảng Trị</option>
            <option value="Hà Tĩnh">Hà Tĩnh</option>
            <option value="Nghệ An">Nghệ An</option>
            <option value="Lào Cai">Lào Cai</option>
            <option value="Yên Bái">Yên Bái</option>
            <option value="Tuyên Quang">Tuyên Quang</option>
            <option value="Hòa Bình">Hòa Bình</option>
            <option value="Phú Thọ">Phú Thọ</option>
            <option value="Bắc Giang">Bắc Giang</option>
            <option value="Hưng Yên">Hưng Yên</option>
            <option value="Nam Định">Nam Định</option>
            <option value="Thái Bình">Thái Bình</option>
            <option value="Hải Dương">Hải Dương</option>
            <option value="Bắc Kạn">Bắc Kạn</option>
          </select>
        </div>

        <div className="combo-search__filter-group">
          <h3 className="combo-search__filter-label">Ngày đi</h3>
          <input type="date" className="combo-search__date-picker" />
        </div>

        <div className="combo-search__filter-group">
          <h3 className="combo-search__filter-label">Loại hình di chuyển</h3>
          <div className="combo-search__filter-options">
            {['Xe', 'Máy bay', 'Tàu hoả', 'Du thuyền'].map((type) => (
              <label 
                key={type} 
                className={`combo-search__option ${filters.transport.includes(type) ? 'active' : ''}`}
                style={{ fontWeight: 'normal' }}
              >
                <input 
                  type="checkbox"
                  checked={filters.transport.includes(type)}
                  onChange={() => handleTransportChange(type)}
                  hidden
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div className="combo-search__divider" />

        <div className="combo-search__filter-group">
          <h3 className="combo-search__filter-label">Ngân sách</h3>
          <div className="combo-search__filter-options">
            {['Dưới 5 triệu', 'Từ 5 - 10 triệu', 'Từ 10 - 20 triệu', 'Trên 20 triệu'].map((option) => {
              const ranges = {
                'Dưới 5 triệu': '0,5000000',
                'Từ 5 - 10 triệu': '5000000,10000000',
                'Từ 10 - 20 triệu': '10000000,20000000',
                'Trên 20 triệu': '20000000,100000000'
              };

              const isActive = filters.priceRange.join(',') === ranges[option];

              return (
                <button
                  key={option}
                  className={`combo-search__budget-option ${isActive ? 'active' : ''}`}
                  onClick={() => handleBudgetChange(option)}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <main className="combo-search__results">
        <header className="combo-search__result-header">
          <div className="combo-search__result-info">
            <span className="combo-search__result-count">
              {[...comboDeals]
                .filter((combo) => {
                  const [min, max] = filters.priceRange;
                  const matchPrice = combo.price >= min && combo.price <= max;
                  const matchDestination = !filters.destination || combo.location === filters.destination;
                  const matchTransport = filters.transport.length === 0 || filters.transport.includes(combo.transportType);
                  return matchPrice && matchDestination && matchTransport;
                }).length > 0
                ? `Tìm thấy ${
                    [...comboDeals].filter((combo) => {
                      const [min, max] = filters.priceRange;
                      const matchPrice = combo.price >= min && combo.price <= max;
                      const matchDestination = !filters.destination || combo.location === filters.destination;
                      const matchTransport = filters.transport.length === 0 || filters.transport.includes(combo.transportType);
                      return matchPrice && matchDestination && matchTransport;
                    }).length
                  } combo phù hợp`
                : 'Không tìm thấy kết quả nào'}
            </span>

          </div>

          <div className="combo-search__sort">
            <label style={{ fontWeight: 'bold', color: '#2c3e50' }}>Sắp xếp theo:</label>
            <select
              className="combo-search__sort-select"
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
            >
              <option value="priceAsc">Giá thấp → cao</option>
              <option value="priceDesc">Giá cao → thấp</option>
              <option value="rating">Đánh giá tốt nhất</option>
              <option value="popular">Phổ biến nhất</option>
            </select>
          </div>
        </header>

        <div
          className="combo-results-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px'
          }}
        >
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} onRetry={handleRetry} />
          ) : (
            [...comboDeals]
            .filter((combo) => {
              const [min, max] = filters.priceRange;
              const matchPrice = combo.price >= min && combo.price <= max;
              const matchDestination = filters.destination === '' || combo.location === filters.destination;
              const matchTransport = filters.transport.length === 0 || filters.transport.includes(combo.transportType);
              return matchPrice && matchDestination && matchTransport;
            })
            .sort((a, b) => {
              switch (filters.sortBy) {
                case 'priceAsc':
                  return a.price - b.price;
                case 'priceDesc':
                  return b.price - a.price;
                case 'rating':
                  return b.rating - a.rating;
                case 'popular': // nếu chưa có dữ liệu phổ biến → tạm fallback theo rating
                  return b.rating - a.rating;
                default:
                  return 0;
              }
            })
            .map((combo) => (
              <HotelCard
                style={{ minHeight: '360px', padding: '10px' }}
                key={combo.id}
                imageSrc={combo.imageUrl || '/default-combo.jpg'}
                title={combo.title}
                price={combo.price?.toLocaleString() + ' VND' || 'Liên hệ'}
                address={combo.location}
                rating={combo.rating}
                amenities={combo.amenities}
                badgeText="COMBO ƯU ĐÃI"
                onViewDetails={() => window.open(`/combos/${combo.id}`, '_blank')}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ComboSearchPage;
