import React, { useState, useEffect } from 'react';
import './ComboSearchPage.css';
import HotelCard from '../../components/designs/HotelCard'; // Import HotelCard

const ComboSearchPage = () => {
  const [comboDeals, setComboDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    transport: [],
    priceRange: [0, 5000000],
    sortBy: 'priceAsc'
  });

  // Fetch combo deals
  useEffect(() => {
    const fetchComboDeals = async () => {
      try {
        const query = new URLSearchParams({
          minPrice: filters.priceRange[0],
          maxPrice: filters.priceRange[1],
          transport: filters.transport.join(','),
          sortBy: filters.sortBy
        });

        const response = await fetch(`/api/combos?${query}`);
        if (!response.ok) throw new Error('Lỗi tải dữ liệu');
        const data = await response.json();
        setComboDeals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComboDeals();
  }, [filters]);

  // Xử lý thay đổi bộ lọc
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

  return (
    <div className="combo-search">
      <h1 className="combo-search__main-title">COMBO MÁY BAY + KHÁCH SẠN</h1>

      {/* Bộ lọc */}
      <section className="combo-search__filters">
        <h2 className="combo-search__section-title">BỘ LỌC TÌM KIẾM</h2>

        <div className="combo-search__filter-group">
          <h3 className="combo-search__filter-label">Phương tiện:</h3>
          <div className="combo-search__filter-options">
            {['Xe', 'Máy bay'].map((type) => (
              <label key={type} className="combo-search__option">
                <input 
                  type="checkbox"
                  checked={filters.transport.includes(type)}
                  onChange={() => handleTransportChange(type)}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div className="combo-search__divider"></div>

        <div className="combo-search__filter-group">
          <h3 className="combo-search__filter-label">Ngân sách:</h3>
          <div className="combo-search__filter-options">
            {['Dưới 5 triệu', 'Từ 5 - 10 triệu', 'Từ 10 - 20 triệu', 'Trên 20 triệu'].map((option) => (
              <button 
                key={option}
                className={`combo-search__budget-option ${
                  filters.priceRange.join(',') === 
                  {
                    'Dưới 5 triệu': '0,5000000',
                    'Từ 5 - 10 triệu': '5000000,10000000',
                    'Từ 10 - 20 triệu': '10000000,20000000',
                    'Trên 20 triệu': '20000000,100000000'
                  }[option] ? 'active' : ''
                }`}
                onClick={() => handleBudgetChange(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Kết quả */}
      <section className="combo-search__results">
        <div className="combo-search__result-header">
          <span className="combo-search__result-count">
            {`Tìm thấy ${comboDeals.length} combo phù hợp`}
          </span>
          <div className="combo-search__sort">
            <span>Sắp xếp theo:</span>
            <select 
              className="combo-search__sort-select"
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
            >
              <option value="priceAsc">Giá từ thấp đến cao</option>
              <option value="priceDesc">Giá từ cao đến thấp</option>
              <option value="rating">Đánh giá cao nhất</option>
            </select>
          </div>
        </div>

        {/* Danh sách combo */}
        <div className="combo-results-grid">
          {loading ? (
            <div className="loading">Đang tải dữ liệu...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : comboDeals.length === 0 ? (
            <div className="empty">Không tìm thấy combo phù hợp</div>
          ) : (
            comboDeals.map((combo) => (
              <HotelCard
                key={combo.id}
                imageSrc={combo.imageUrl}
                title={combo.title}
                price={`${combo.price.toLocaleString()} VND`}
                address={combo.location}
                rating={combo.rating}
                amenities={combo.amenities}
                onViewRooms={() => console.log('Xem chi tiết', combo.id)}
                // Thêm các props khác tùy theo dữ liệu combo
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default ComboSearchPage;