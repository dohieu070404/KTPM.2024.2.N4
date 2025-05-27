import React, { useState } from 'react';
import './TransportBookingPage.css';
import { FaPlane, FaBus, FaChair, FaSuitcase, FaMoneyBillWave, FaInfoCircle } from 'react-icons/fa';
import { FaFilter } from "react-icons/fa";

const TransportBookingPage = () => {
  const [transportType, setTransportType] = useState('plane'); // 'plane' hoặc 'bus'
  const [filters, setFilters] = useState({
    airlines: {
      'Vietravel Airlines': true,
      'Vietnam Airlines': true,
      'VietJet Air': true,
      'Bamboo Airways': true
    },
    busCompanies: {
      'Phương Trang': true,
      'Hoàng Long': true,
      'Mai Linh': true,
      'Thành Bưởi': true
    },
    timeRanges: {
      'Sáng sớm (00:00 - 06:00)': false,
      'Buổi sáng (06:00 - 12:00)': false,
      'Buổi chiều (12:00 - 18:00)': false,
      'Buổi tối (18:00 - 24:00)': false
    },
    stopType: 'direct',
    sortBy: 'priceLow',
    priceRange: [0, 5000000]
  });

  const [selectedTransport, setSelectedTransport] = useState({
    departure: null,
    return: null
  });

  const [searchParams, setSearchParams] = useState({
    departure: 'SGN',
    destination: 'HAN',
    date: '2025-05-28',
    returnDate: '2025-05-31',
    passengers: 1
  });

  // Dữ liệu mẫu
  const departureFlights = [
    {
      id: 'D1',
      type: 'plane',
      company: 'Vietravel Airlines',
      departureTime: '06:45',
      arrivalTime: '07:55',
      duration: '02h10m',
      price: 2286840,
      from: 'SGN',
      to: 'HAN',
      isDirect: true,
      baggage: '7kg xách tay',
      discount: '1.0%',
      amenities: ['Wifi', 'Đồ ăn'],
      seatsAvailable: 12
    },
    {
      id: 'D2',
      type: 'plane',
      company: 'Vietnam Airlines',
      departureTime: '08:30',
      arrivalTime: '10:40',
      duration: '02h10m',
      price: 2450000,
      from: 'SGN',
      to: 'HAN',
      isDirect: true,
      baggage: '7kg xách tay + 23kg ký gửi',
      discount: '0.5%',
      amenities: ['Wifi', 'Đồ ăn', 'TV'],
      seatsAvailable: 8
    }
  ];

  const departureBuses = [
    {
      id: 'DB1',
      type: 'bus',
      company: 'Phương Trang',
      departureTime: '22:00',
      arrivalTime: '06:00 (+1)',
      duration: '8h',
      price: 500000,
      from: 'Bến xe Miền Đông',
      to: 'Bến xe Giáp Bát',
      busType: 'Giường nằm',
      amenities: ['Wifi', 'Nước uống', 'Chăn gối'],
      seatsAvailable: 20
    },
    {
      id: 'DB2',
      type: 'bus',
      company: 'Mai Linh',
      departureTime: '08:00',
      arrivalTime: '16:00',
      duration: '8h',
      price: 450000,
      from: 'Bến xe Miền Đông',
      to: 'Bến xe Giáp Bát',
      busType: 'Ghế ngồi',
      amenities: ['Wifi', 'Nước uống'],
      seatsAvailable: 15
    }
  ];

  const returnFlights = [
    {
      id: 'R1',
      type: 'plane',
      company: 'Vietravel Airlines',
      departureTime: '06:45',
      arrivalTime: '10:55',
      duration: '04h10m',
      price: 2114040,
      from: 'HAN',
      to: 'SGN',
      isDirect: true,
      baggage: '7kg xách tay',
      discount: '1.0%',
      amenities: ['Wifi', 'Đồ ăn'],
      seatsAvailable: 10
    }
  ];

  const returnBuses = [
    {
      id: 'RB1',
      type: 'bus',
      company: 'Hoàng Long',
      departureTime: '21:00',
      arrivalTime: '05:00 (+1)',
      duration: '8h',
      price: 550000,
      from: 'Bến xe Giáp Bát',
      to: 'Bến xe Miền Đông',
      busType: 'Giường nằm VIP',
      amenities: ['Wifi', 'Nước uống', 'Chăn gối', 'TV'],
      seatsAvailable: 18
    }
  ];

  // Xử lý thay đổi
  const handleTransportChange = (type) => {
    setTransportType(type);
    setSelectedTransport({ departure: null, return: null });
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: {
        ...prev[filterType],
        [value]: !prev[filterType][value]
      }
    }));
  };

  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value);
    setFilters(prev => ({
      ...prev,
      priceRange: [0, value]
    }));
  };

  const selectTransport = (type, transport) => {
    setSelectedTransport(prev => ({
      ...prev,
      [type]: transport
    }));
  };

  const removeTransport = (type) => {
    setSelectedTransport(prev => ({
      ...prev,
      [type]: null
    }));
  };

  const calculateTotal = () => {
    let total = 0;
    if (selectedTransport.departure) total += selectedTransport.departure.price;
    if (selectedTransport.return) total += selectedTransport.return.price;
    return total;
  };

  const renderTransportList = (transports, type) => {
    return transports
      .filter(transport => 
        transport.type === transportType && 
        (transportType === 'plane' 
          ? filters.airlines[transport.company] 
          : filters.busCompanies[transport.company]) &&
        transport.price >= filters.priceRange[0] && 
        transport.price <= filters.priceRange[1]
      )
      .map(transport => (
        <div 
          key={transport.id} 
          className={`transport-card ${selectedTransport[type]?.id === transport.id ? 'selected' : ''}`}
        >
          <div className="transport-header">
            <div className="company-info">
              <span className="company">{transport.company}</span>
              {transport.discount && <span className="discount">{transport.discount}</span>}
            </div>
            <div className="price">{transport.price.toLocaleString()} ₫</div>
          </div>
          
          <div className="transport-details">
            <div className="time-info">
              <span className="time">{transport.departureTime}</span>
              <span className="duration">{transport.duration}</span>
              <span className="time">{transport.arrivalTime}</span>
            </div>
            
            <div className="route-info">
              <span>{transport.from}</span>
              <span className="transport-type">
                {transport.type === 'plane' 
                  ? (transport.isDirect ? 'Bay thẳng' : 'Có điểm dừng') 
                  : transport.busType}
              </span>
              <span>{transport.to}</span>
            </div>
            
            <div className="amenities">
              {transport.amenities.map((item, index) => (
                <span key={index} className="amenity">{item}</span>
              ))}
            </div>
          </div>
          
          <div className="transport-footer">
            <div className="meta-info">
              <span><FaChair /> {transport.seatsAvailable} chỗ</span>
              {transport.type === 'plane' && <span><FaSuitcase /> {transport.baggage}</span>}
            </div>
            
            <div className="action-buttons">
              <button className="detail-btn"><FaInfoCircle /> Chi tiết</button>
              {selectedTransport[type]?.id === transport.id ? (
                <button 
                  className="remove-btn"
                  onClick={() => removeTransport(type)}
                >
                  Bỏ chọn
                </button>
              ) : (
                <button 
                  className="select-btn"
                  onClick={() => selectTransport(type, transport)}
                >
                  Chọn vé
                </button>
              )}
            </div>
          </div>
        </div>
      ));
  };

  return (
    <div className="transport-booking">
      {/* Header */}
      <div className="booking-header">
        <h1>ĐẶT VÉ {transportType === 'plane' ? 'MÁY BAY' : 'XE KHÁCH'}</h1>
        
        <div className="transport-switcher">
          <button 
            className={`transport-btn ${transportType === 'plane' ? 'active' : ''}`}
            onClick={() => handleTransportChange('plane')}
          >
            <FaPlane /> Máy bay
          </button>
          <button 
            className={`transport-btn ${transportType === 'bus' ? 'active' : ''}`}
            onClick={() => handleTransportChange('bus')}
          >
            <FaBus /> Xe khách
          </button>
        </div>
      </div>

      {/* Search Form */}
      <form className="search-form">
        <div className="form-group">
          <label>Điểm đi</label>
          <input 
            type="text" 
            value={searchParams.departure} 
            onChange={(e) => setSearchParams({...searchParams, departure: e.target.value})}
          />
        </div>
        
        <div className="form-group">
          <label>Điểm đến</label>
          <input 
            type="text" 
            value={searchParams.destination} 
            onChange={(e) => setSearchParams({...searchParams, destination: e.target.value})}
          />
        </div>
        
        <div className="form-group">
          <label>Ngày đi</label>
          <input 
            type="date" 
            value={searchParams.date} 
            onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
          />
        </div>
        
        <div className="form-group">
          <label>Ngày về</label>
          <input 
            type="date" 
            value={searchParams.returnDate} 
            onChange={(e) => setSearchParams({...searchParams, returnDate: e.target.value})}
          />
        </div>
        
        <div className="form-group">
          <label>Số lượng</label>
          <select 
            value={searchParams.passengers} 
            onChange={(e) => setSearchParams({...searchParams, passengers: parseInt(e.target.value)})}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <option key={num} value={num}>{num} người</option>
            ))}
          </select>
        </div>
        
        <button type="submit" className="search-btn">Tìm kiếm</button>
      </form>

      <div className="booking-container">
        {/* Filters */}
        <div className="filters">
          <h2><FaFilter /> BỘ LỌC TÌM KIẾM</h2>
          
          <div className="filter-section">
            <h3>{transportType === 'plane' ? 'Hãng bay' : 'Nhà xe'}</h3>
            {Object.keys(transportType === 'plane' ? filters.airlines : filters.busCompanies).map(company => (
              <label key={company} className="filter-option">
                <input
                  type="checkbox"
                  checked={transportType === 'plane' ? filters.airlines[company] : filters.busCompanies[company]}
                  onChange={() => handleFilterChange(transportType === 'plane' ? 'airlines' : 'busCompanies', company)}
                />
                {company}
              </label>
            ))}
          </div>

          <div className="filter-section">
            <h3>Khung giờ</h3>
            {Object.keys(filters.timeRanges).map(timeRange => (
              <label key={timeRange} className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.timeRanges[timeRange]}
                  onChange={() => handleFilterChange('timeRanges', timeRange)}
                />
                {timeRange}
              </label>
            ))}
          </div>

          {transportType === 'plane' && (
            <div className="filter-section">
              <h3>Điểm dừng</h3>
              <label className="filter-option">
                <input
                  type="radio"
                  name="stopType"
                  checked={filters.stopType === 'direct'}
                  onChange={() => setFilters({...filters, stopType: 'direct'})}
                />
                Bay thẳng
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="stopType"
                  checked={filters.stopType === '1stop'}
                  onChange={() => setFilters({...filters, stopType: '1stop'})}
                />
                1 điểm dừng
              </label>
            </div>
          )}

          <div className="filter-section">
            <h3>Mức giá</h3>
            <div className="price-range-display">
              <span>0 đ</span>
              <span>{filters.priceRange[1].toLocaleString()} đ</span>
            </div>
            <input
              type="range"
              min="0"
              max="5000000"
              step="100000"
              value={filters.priceRange[1]}
              onChange={handlePriceRangeChange}
              className="price-slider"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Departure */}
          <div className="transport-section">
            <h2>CHUYẾN ĐI: {transportType === 'plane' ? `${searchParams.departure} → ${searchParams.destination}` 
              : 'Bến xe Miền Đông → Bến xe Giáp Bát'}</h2>
            
            {transportType === 'plane' 
              ? renderTransportList(departureFlights, 'departure')
              : renderTransportList(departureBuses, 'departure')
            }
          </div>

          {/* Return */}
          <div className="transport-section">
            <h2>CHUYẾN VỀ: {transportType === 'plane' ? `${searchParams.destination} → ${searchParams.departure}` 
              : 'Bến xe Giáp Bát → Bến xe Miền Đông'}</h2>
            
            {transportType === 'plane' 
              ? renderTransportList(returnFlights, 'return')
              : renderTransportList(returnBuses, 'return')
            }
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h2><FaMoneyBillWave /> TÓM TẮT ĐƠN HÀNG</h2>
          
          {selectedTransport.departure && (
            <div className="summary-item">
              <h3>CHUYẾN ĐI</h3>
              <div className="item-details">
                <div className="item-header">
                  <span className="company">{selectedTransport.departure.company}</span>
                  <span className="price">{selectedTransport.departure.price.toLocaleString()} ₫</span>
                </div>
                <div className="item-time">
                  <span>{selectedTransport.departure.departureTime}</span>
                  <span>{selectedTransport.departure.duration}</span>
                  <span>{selectedTransport.departure.arrivalTime}</span>
                </div>
                <div className="item-route">
                  <span>{selectedTransport.departure.from}</span>
                  <span>→</span>
                  <span>{selectedTransport.departure.to}</span>
                </div>
              </div>
            </div>
          )}
          
          {selectedTransport.return && (
            <div className="summary-item">
              <h3>CHUYẾN VỀ</h3>
              <div className="item-details">
                <div className="item-header">
                  <span className="company">{selectedTransport.return.company}</span>
                  <span className="price">{selectedTransport.return.price.toLocaleString()} ₫</span>
                </div>
                <div className="item-time">
                  <span>{selectedTransport.return.departureTime}</span>
                  <span>{selectedTransport.return.duration}</span>
                  <span>{selectedTransport.return.arrivalTime}</span>
                </div>
                <div className="item-route">
                  <span>{selectedTransport.return.from}</span>
                  <span>→</span>
                  <span>{selectedTransport.return.to}</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="total-price">
            <span>Tổng cộng:</span>
            <span className="amount">{calculateTotal().toLocaleString()} ₫</span>
          </div>
          
          <button 
            className="confirm-btn"
            disabled={!selectedTransport.departure || !selectedTransport.return}
          >
            XÁC NHẬN ĐẶT VÉ
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransportBookingPage;