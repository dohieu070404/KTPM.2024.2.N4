
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
 {
    id: 3,
    user: "Nguyễn Văn C",
    email: "c.nguyen@example.com",
    type: "Báo lỗi",
    content: "Ứng dụng bị treo khi đặt vé",
    date: "2024-05-15",
    status: "Đang xử lý",
    notes: "Chuyển bộ phận kỹ thuật"
  },
  {
    id: 4,
    user: "Lê Thị D",
    email: "d.le@example.com",
    type: "Dịch vụ",
    content: "Không tìm thấy khách sạn đã đặt",
    date: "2024-05-16",
    status: "Đang xử lý",
    notes: "Kiểm tra với đối tác"
  },
  {
    id: 5,
    user: "Phạm Văn E",
    email: "e.pham@example.com",
    type: "Báo cáo khách sạn",
    content: "Phòng không giống mô tả",
    date: "2024-05-17",
    status: "Đang xử lý",
    notes: "Cần xác minh hình ảnh"
  },
  {
    id: 6,
    user: "Đặng Thị F",
    email: "f.dang@example.com",
    type: "Dịch vụ",
    content: "Tài khoản bị khóa không rõ lý do",
    date: "2024-05-18",
    status: "Đang xử lý",
    notes: "Đã gửi thông tin xác minh"
  },
  {
    id: 7,
    user: "Võ Minh G",
    email: "g.vo@example.com",
    type: "Thanh toán",
    content: "Thanh toán thành công nhưng không có vé",
    date: "2024-05-18",
    status: "Đang xử lý",
    notes: "Đã báo kỹ thuật kiểm tra"
  },
  {
    id: 8,
    user: "Lý Thị H",
    email: "h.ly@example.com",
    type: "Báo lỗi",
    content: "Không nhận được mã xác nhận",
    date: "2024-05-18",
    status: "Đang xử lý",
    notes: "Đã gửi lại mã xác nhận"
  },
  {
    id: 9,
    user: "Trương Văn I",
    email: "i.truong@example.com",
    type: "Báo cáo khách sạn",
    content: "Nhân viên khách sạn cư xử không đúng mực",
    date: "2024-05-18",
    status: "Đang xử lý",
    notes: "Đang chờ phản hồi từ khách sạn"
  },
  {
    id: 10,
    user: "Ngô Thị J",
    email: "j.ngo@example.com",
    type: "Dịch vụ",
    content: "Không thể đăng nhập tài khoản",
    date: "2024-05-19",
    status: "Đang xử lý",
    notes: "Đã reset mật khẩu"
  },
  {
    id: 11,
    user: "Huỳnh Văn K",
    email: "k.huynh@example.com",
    type: "Thanh toán",
    content: "Hoàn tiền chậm trễ",
    date: "2024-05-20",
    status: "Đang xử lý",
    notes: "Chờ ngân hàng xác nhận"
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