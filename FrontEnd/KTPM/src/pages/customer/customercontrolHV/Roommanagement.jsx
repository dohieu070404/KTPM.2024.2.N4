import React, { useState } from "react";
import "./Roommanagement.css";

const initialRooms = [
  { id: 1, number: "101", type: "Deluxe", status: "Trống" },
  { id: 2, number: "102", type: "Suite", status: "Đang sử dụng" },
];

function RoomManagement() {
  const [rooms, setRooms] = useState(initialRooms);
  const [editing, setEditing] = useState(null);

  const handleDelete = (id) => setRooms(rooms.filter(r => r.id !== id));
  const handleEdit = (room) => setEditing(room);
  const handleSave = (room) => {
    if (room.id) {
      setRooms(rooms.map(r => (r.id === room.id ? room : r)));
    } else {
      setRooms([...rooms, { ...room, id: Date.now() }]);
    }
    setEditing(null);
  };

  return (
    <div className="roommanagement-container">
      <h1>Quản lý phòng</h1>
      <button className="roommanagement-add-btn" onClick={() => setEditing({})}>+ Thêm phòng</button>
      <table className="roommanagement-table">
        <thead>
          <tr>
            <th>Số phòng</th>
            <th>Loại phòng</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>Chưa có phòng nào!</td>
            </tr>
          )}
          {rooms.map(room => (
            <tr key={room.id}>
              <td>{room.number}</td>
              <td>{room.type}</td>
              <td>{room.status}</td>
              <td>
                <button className="roommanagement-edit-btn" onClick={() => handleEdit(room)}>Sửa</button>
                <button className="roommanagement-delete-btn" onClick={() => handleDelete(room.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editing !== null &&
        <RoomForm
          room={editing}
          onCancel={() => setEditing(null)}
          onSave={handleSave}
        />
      }
    </div>
  );
}

function RoomForm({ room, onSave, onCancel }) {
  const [form, setForm] = useState({
    number: room.number || "",
    type: room.type || "Deluxe",
    status: room.status || "Trống",
    id: room.id,
  });

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.number) {
      alert("Vui lòng nhập số phòng!");
      return;
    }
    onSave(form);
  };

  return (
    <div className="roommanagement-form-overlay">
      <div className="roommanagement-form-container">
        <h2>{form.id ? "Sửa phòng" : "Thêm phòng"}</h2>
        <form className="roommanagement-form" onSubmit={handleSubmit}>
          <label>Số phòng:</label>
          <input name="number" value={form.number} onChange={handleChange} required />
          <label>Loại phòng:</label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option>Deluxe</option>
            <option>Suite</option>
            <option>Standard</option>
          </select>
          <label>Trạng thái:</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Trống</option>
            <option>Đang sử dụng</option>
            <option>Bảo trì</option>
          </select>
          <button type="submit" className="roommanagement-save-btn">{form.id ? "Cập nhật" : "Lưu"}</button>
          <button type="button" className="roommanagement-cancel-btn" onClick={onCancel}>Hủy</button>
        </form>
      </div>
    </div>
  );
}

export default RoomManagement;