import React, { useState } from "react";
import "./CustomerSP.css";

const initialTickets = [
  { id: 1, customer: "Nguyễn Văn A", issue: "Phòng bẩn", status: "Đang xử lý" },
  { id: 2, customer: "Lê Thị B", issue: "Không nhận được xác nhận đặt phòng", status: "Đã giải quyết" },
];

function CustomerSupport() {
  const [tickets, setTickets] = useState(initialTickets);
  const [replying, setReplying] = useState(null);

  const handleReply = (ticket) => setReplying(ticket);
  const handleStatus = (id, status) => setTickets(tickets.map(t => t.id === id ? { ...t, status } : t));

  return (
    <div className="customersupport-container">
      <h1>Hỗ trợ khách hàng</h1>
      <table className="customersupport-table">
        <thead>
          <tr>
            <th>Khách hàng</th>
            <th>Vấn đề</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>Không có yêu cầu hỗ trợ nào!</td>
            </tr>
          )}
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <td>{ticket.customer}</td>
              <td>{ticket.issue}</td>
              <td>{ticket.status}</td>
              <td>
                <button className="customersupport-reply-btn" onClick={() => handleReply(ticket)}>Phản hồi</button>
                {ticket.status !== "Đã giải quyết" && (
                  <button className="customersupport-done-btn" onClick={() => handleStatus(ticket.id, "Đã giải quyết")}>Đánh dấu đã giải quyết</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {replying &&
        <ReplyModal ticket={replying} onClose={() => setReplying(null)} onReply={() => { handleStatus(replying.id, "Đã giải quyết"); setReplying(null); }} />
      }
    </div>
  );
}

function ReplyModal({ ticket, onClose, onReply }) {
  const [reply, setReply] = useState("");
  return (
    <div className="customersupport-form-overlay">
      <div className="customersupport-form-container">
        <h2>Phản hồi khách hàng: {ticket.customer}</h2>
        <p><b>Vấn đề:</b> {ticket.issue}</p>
        <textarea placeholder="Nội dung phản hồi" value={reply} onChange={e => setReply(e.target.value)} rows={4} />
        <button className="customersupport-save-btn" onClick={onReply} disabled={!reply}>Gửi phản hồi & Đánh dấu đã giải quyết</button>
        <button className="customersupport-cancel-btn" onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
}

export default CustomerSupport;