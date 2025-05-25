
import './AminHelpCenter.css';
import React, { useState } from "react";

const initialComplaints = [
  {
    id: 1,
    user: "Nguyễn Văn A",
    email: "a.nguyen@example.com",
    type: "Dịch vụ",
    content: "Dịch vụ đặt phòng không hoạt động",
    date: "2024-05-15",
    status: "Chưa xử lý",
    notes: ""
  },
  {
    id: 2,
    user: "Trần Thị B",
    email: "b.tran@example.com",
    type: "Thanh toán",
    content: "Hoàn tiền không thành công",
    date: "2024-05-14",
    status: "Đang xử lý",
    notes: "Đã liên hệ ngân hàng"
  },
];

function AminHelpCenter() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");

  const statusOptions = ["Tất cả", "Chưa xử lý", "Đang xử lý", "Đã giải quyết"];

  const filteredComplaints = complaints.filter(complaint => {
    const matchesStatus = filterStatus === "Tất cả" || complaint.status === filterStatus;
    const matchesSearch = complaint.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.user.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (id, newStatus) => {
    setComplaints(complaints.map(c => 
      c.id === id ? { ...c, status: newStatus } : c
    ))};
  
  const updateNotes = (id, newNotes) => {
    setComplaints(complaints.map(c => 
      c.id === id ? { ...c, notes: newNotes } : c
    ))};

  return (
    <div className="complaint-management-container">
      <h1>Quản lý Khiếu nại</h1>
      
      <div className="filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Tìm kiếm theo nội dung hoặc người dùng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="status-filter">
          <label>Lọc theo trạng thái:</label>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            {statusOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="complaint-list">
        {filteredComplaints.length === 0 ? (
          <div className="no-complaints">Không tìm thấy khiếu nại nào</div>
        ) : (
          filteredComplaints.map(complaint => (
            <div 
              key={complaint.id} 
              className={`complaint-card ${complaint.status.toLowerCase().replace(' ', '-')}`}
            >
              <div className="complaint-header">
                <h3>{complaint.user}</h3>
                <span className="status-badge">{complaint.status}</span>
              </div>
              
              <div className="complaint-body">
                <div className="complaint-meta">
                  <span className="type-tag">{complaint.type}</span>
                  <span className="complaint-date">{complaint.date}</span>
                </div>
                <p className="complaint-content">{complaint.content}</p>
              </div>

              <div className="complaint-actions">
                <button 
                  className="detail-btn"
                  onClick={() => setSelectedComplaint(complaint)}
                >
                  Xem chi tiết
                </button>
                <select
                  value={complaint.status}
                  onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
                  className="status-select"
                >
                  {statusOptions.slice(1).map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedComplaint && (
        <div className="complaint-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Chi tiết khiếu nại</h2>
              <button 
                className="close-btn"
                onClick={() => setSelectedComplaint(null)}
              >
                &times;
              </button>
            </div>
            
            <div className="modal-body">
              <div className="user-info">
                <p><strong>Người gửi:</strong> {selectedComplaint.user}</p>
                <p><strong>Email:</strong> {selectedComplaint.email}</p>
              </div>
              
              <div className="complaint-details">
                <p><strong>Loại khiếu nại:</strong> {selectedComplaint.type}</p>
                <p><strong>Ngày gửi:</strong> {selectedComplaint.date}</p>
                <p><strong>Nội dung:</strong></p>
                <div className="content-box">{selectedComplaint.content}</div>
              </div>

              <div className="notes-section">
                <label>Ghi chú xử lý:</label>
                <textarea
                  value={selectedComplaint.notes}
                  onChange={(e) => updateNotes(selectedComplaint.id, e.target.value)}
                  placeholder="Thêm ghi chú xử lý..."
                />
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="save-btn"
                onClick={() => setSelectedComplaint(null)}
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

 export default AminHelpCenter;