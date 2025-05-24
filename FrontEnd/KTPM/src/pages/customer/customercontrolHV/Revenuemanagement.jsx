import React, { useState } from "react";
import "./Revenuemanagement.css";

const initialRevenue = [
  { id: 1, date: "2025-05-01", source: "Đặt phòng", amount: 3500000 },
  { id: 2, date: "2025-05-03", source: "Dịch vụ khác", amount: 450000 },
];

function RevenueManagement() {
  const [revenue, setRevenue] = useState(initialRevenue);

  const total = revenue.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="revenuemanagement-container">
      <h1>Quản lý doanh thu</h1>
      <table className="revenuemanagement-table">
        <thead>
          <tr>
            <th>Ngày</th>
            <th>Nguồn thu</th>
            <th>Số tiền (VNĐ)</th>
          </tr>
        </thead>
        <tbody>
          {revenue.length === 0 && (
            <tr>
              <td colSpan={3} style={{ textAlign: "center" }}>Chưa có dữ liệu doanh thu!</td>
            </tr>
          )}
          {revenue.map(r => (
            <tr key={r.id}>
              <td>{r.date}</td>
              <td>{r.source}</td>
              <td>{r.amount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}><b>Tổng doanh thu</b></td>
            <td><b>{total.toLocaleString()}</b></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default RevenueManagement;