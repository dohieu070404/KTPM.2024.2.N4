import './AdminRevenue.css'


import React, { useState } from "react";

const initialRevenue = [
  { 
    id: 1, 
    date: "2024-05-01", 
    source: "Phí quản lý", 
    amount: 15000000,
    type: "monthly" 
  },
  { 
    id: 2, 
    date: "2024-05-03", 
    source: "Phí đối tác", 
    amount: 4500000,
    type: "monthly" 
  },
  { 
    id: 3, 
    date: "2024-01-15", 
    source: "Hoa hồng", 
    amount: 7500000,
    type: "annual" 
  },
];

function AdminRevenue() {
  const [revenue] = useState(initialRevenue);
  const [filterType, setFilterType] = useState("month");
  const [selectedDate, setSelectedDate] = useState("2024-05");

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