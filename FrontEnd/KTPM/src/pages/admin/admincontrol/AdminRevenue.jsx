import './AdminRevenue.css'


import React, { useState } from "react";

const initialRevenue = [
  { 
    id: 1, 
    date: "2025-05-01", 
    source: "Phí quản lý", 
    amount: 15000000,
    type: "monthly" 
  },
  { 
    id: 2, 
    date: "2025-05-03", 
    source: "Phí đối tác", 
    amount: 4500000,
    type: "monthly" 
  },
  { 
    id: 3, 
    date: "2025-01-15", 
    source: "Hoa hồng", 
    amount: 7500000,
    type: "annual" 
  },
  { 
    id: 4, 
    date: "2025-01-28", 
    source: "Hoa hồng", 
    amount: 6800000, 
    type: "annual" 
  },
  { 
    id: 5, 
    date: "2025-02-12", 
    source: "Hoa hồng", 
    amount: 8100000, 
    type: "annual" 
  },
  { 
    id: 6, 
    date: "2025-02-27", 
    source: "Hoa hồng", 
    amount: 7200000, 
    type: "annual" 
  },
  { 
    id: 7, 
    date: "2025-03-05", 
    source: "Hoa hồng", 
    amount: 7900000, 
    type: "annual" 
  },
  { 
    id: 8, 
    date: "2025-03-20", 
    source: "Hoa hồng", 
    amount: 7650000, 
    type: "annual" 
  },
  { 
    id: 9, 
    date: "2025-04-10", 
    source: "Hoa hồng", 
    amount: 8000000, 
    type: "annual" 
  },
  { 
    id: 10, 
    date: "2025-04-25", 
    source: "Hoa hồng", 
    amount: 8300000, 
    type: "annual" 
  },
  { 
    id: 11, 
    date: "2025-05-02", 
    source: "Hoa hồng", 
    amount: 8700000, 
    type: "annual" 
  },
  { 
    id: 12, 
    date: "2025-05-18", 
    source: "Hoa hồng", 
    amount: 8500000, 
    type: "annual" 
  },
  { 
    id: 13, 
    date: "2025-03-05", 
    source: "Phí quản lý", 
    amount: 7900000, 
    type: "annual" 
  },
  { 
    id: 14, 
    date: "2025-03-20", 
    source: "Phí quản lý", 
    amount: 7650000, 
    type: "annual" 
  },
  { 
    id: 15, 
    date: "2025-04-10", 
    source: "Phí quản lý", 
    amount: 8000000, 
    type: "annual" 
  },
  { 
    id: 16, 
    date: "2025-04-25", 
    source: "Phí quản lý", 
    amount: 8300000, 
    type: "annual" 
  },
  { 
    id: 17, 
    date: "2025-05-02", 
    source: "Phí quản lý", 
    amount: 8700000, 
    type: "annual" 
  },
  { 
    id: 18, 
    date: "2025-05-18", 
    source: "Phí quản lý", 
    amount: 8500000, 
    type: "annual" 
  }
  
  
];

function AdminRevenue() {
  const [revenue] = useState(initialRevenue);
  const [filterType, setFilterType] = useState("month");
  const [selectedDate, setSelectedDate] = useState("2025-05");

  const filteredRevenue = revenue.filter(item => {
    const date = new Date(item.date);
    if (filterType === "month") {
      return date.toISOString().slice(0,7) === selectedDate;
    }
    return date.getFullYear().toString() === selectedDate;
  });

  const total = filteredRevenue.reduce((sum, r) => sum + r.amount, 0);

  const revenueSources = [
    "Phí quản lý",
    "Phí đối tác",
    "Hoa hồng",
    "Dịch vụ khác"
  ];

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="revenue-management-container">
      <h1>Quản lý Doanh thu</h1>
      
      <div className="revenue-filter">
        <select 
          value={filterType} 
          onChange={(e) => setFilterType(e.target.value)}
          className="filter-select"
        >
          <option value="month">Theo tháng</option>
          <option value="year">Theo năm</option>
        </select>

        {filterType === "month" ? (
          <input
            type="month"
            value={selectedDate}
            onChange={handleDateChange}
            className="date-input"
          />
        ) : (
          <select 
            value={selectedDate} 
            onChange={handleDateChange}
            className="year-select"
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        )}
      </div>

      <div className="revenue-summary">
        <div className="summary-card total-revenue">
          <h3>Tổng doanh thu</h3>
          <p>{total.toLocaleString()} VNĐ</p>
        </div>
        
        <div className="summary-card revenue-sources">
          <h3>Nguồn thu chính</h3>
          <ul className='AdminRevenue-value-listlist'>
            {revenueSources.map(source => (
              <li key={source}>
                {source}: {
                  filteredRevenue
                    .filter(r => r.source === source)
                    .reduce((sum, r) => sum + r.amount, 0)
                    .toLocaleString()
                } VNĐ
              </li>
            ))}
          </ul>
        </div>
      </div>

      <table className="revenue-table">
        <thead>
          <tr>
            <th>Ngày</th>
            <th>Nguồn thu</th>
            <th>Số tiền (VNĐ)</th>
          </tr>
        </thead>
        <tbody>
          {filteredRevenue.length === 0 ? (
            <tr>
              <td colSpan={3} className="no-data">Không có dữ liệu trong khoảng thời gian này</td>
            </tr>
          ) : (
            filteredRevenue.map(r => (
              <tr className='AdminRevenue-value-listlist' key={r.id}>
                <td>{new Date(r.date).toLocaleDateString()}</td>
                <td>{r.source}</td>
                <td>{r.amount.toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

 export default AdminRevenue; 