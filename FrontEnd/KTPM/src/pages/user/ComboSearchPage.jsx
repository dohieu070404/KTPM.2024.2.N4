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
    priceRange: [0, 5000000],
    sortBy: 'priceAsc'
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
  // Fetch combo deals với retry mechanism
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchComboDeals = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const query = new URLSearchParams({
          minPrice: filters.priceRange[0],
          maxPrice: filters.priceRange[1],
          transport: filters.transport.join(','),
          sortBy: filters.sortBy
        });

        const response = await fetch(`/api/combos?${query}`, { signal });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setComboDeals(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setComboDeals([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchComboDeals();
    return () => controller.abort();
  }, [filters, retryCount]);

  // Xử lý filter changes
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
    setFilters(prev => ({ ...prev, priceRange: ranges[range] }));
  };

  // Xử lý retry
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  return (
    <div className="combo-search">
      <h1 className="combo-search__main-title">COMBO DU LỊCH TRỌN GÓI</h1>

      {/* Filter Section */}
      <aside className="combo-search__filters">
        <h2 className="combo-search__section-title">BỘ LỌC</h2>

        {/* Phương tiện di chuyển */}
        <div className="combo-search__filter-group">
          <h3 className="combo-search__filter-label">Loại hình di chuyển</h3>
          <div className="combo-search__filter-options">
            {['Xe', 'Máy bay'].map((type) => (
              <label 
                key={type} 
                className={`combo-search__option ${filters.transport.includes(type) ? 'active' : ''}`}
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

        {/* Ngân sách */}
        <div className="combo-search__filter-group">
          <h3 className="combo-search__filter-label">Mức giá</h3>
          <div className="combo-search__filter-options">
            {['Dưới 5 triệu', 'Từ 5 - 10 triệu', 'Từ 10 - 20 triệu', 'Trên 20 triệu'].map((option) => {
              const isActive = filters.priceRange.join(',') === 
                {
                  'Dưới 5 triệu': '0,5000000',
                  'Từ 5 - 10 triệu': '5000000,10000000',
                  'Từ 10 - 20 triệu': '10000000,20000000',
                  'Trên 20 triệu': '20000000,100000000'
                }[option];
              
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

      {/* Main Content */}
      <main className="combo-search__results">
        <header className="combo-search__result-header">
          <div className="combo-search__result-info">
            <span className="combo-search__result-count">
              {comboDeals.length > 0 
                ? `Tìm thấy ${comboDeals.length} combo phù hợp` 
                : 'Không tìm thấy kết quả nào'}
            </span>
          </div>
          
          <div className="combo-search__sort">
            <label>Sắp xếp theo:</label>
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

        {/* Content Section */}
        <div className="combo-results-grid">
          {loading ? (
            <LoadingSpinner message="Đang tải dữ liệu..." />
          ) : error ? (
            <ErrorMessage 
              message={error}
              onRetry={handleRetry}
            />
          ) : (
            comboDeals.map((combo) => (
              <HotelCard
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