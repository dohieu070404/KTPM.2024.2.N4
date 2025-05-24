import React, { useState } from "react";
import "./Hotelmanagement.css";

const initialHotels = [
  { id: 1, name: "Sunflower Hotel", location: "Nha Trang", status: "Hoạt động" },
  { id: 2, name: "Palm Beach", location: "Phú Quốc", status: "Đang bảo trì" },
];

function HotelManagement() {
  const [hotels, setHotels] = useState(initialHotels);
  const [editing, setEditing] = useState(null);

  const handleDelete = (id) => setHotels(hotels.filter(h => h.id !== id));
  const handleEdit = (hotel) => setEditing(hotel);
  const handleSave = (hotel) => {
    if (hotel.id) {
      setHotels(hotels.map(h => (h.id === hotel.id ? hotel : h)));
    } else {
      setHotels([...hotels, { ...hotel, id: Date.now() }]);
    }
    setEditing(null);
  };

  return (
    <div className="hotelmanagement-container">
      <h1>Quản lý khách sạn</h1>
      <button className="hotelmanagement-add-btn" onClick={() => setEditing({})}>+ Thêm khách sạn</button>
      <table className="hotelmanagement-table">
        <thead>
          <tr>
            <th>Tên khách sạn</th>
            <th>Địa điểm</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {hotels.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>Chưa có khách sạn nào!</td>
            </tr>
          )}
          {hotels.map(hotel => (
            <tr key={hotel.id}>
              <td>{hotel.name}</td>
              <td>{hotel.location}</td>
              <td>{hotel.status}</td>
              <td>
                <button className="hotelmanagement-edit-btn" onClick={() => handleEdit(hotel)}>Sửa</button>
                <button className="hotelmanagement-delete-btn" onClick={() => handleDelete(hotel.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editing !== null &&
        <HotelForm
          hotel={editing}
          onCancel={() => setEditing(null)}
          onSave={handleSave}
        />
      }
    </div>
  );
}

function HotelForm({ hotel, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: hotel.name || "",
    location: hotel.location || "",
    status: hotel.status || "Hoạt động",
    id: hotel.id,
  });

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.location) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    onSave(form);
  };

  return (
    <div className="hotelmanagement-form-overlay">
      <div className="hotelmanagement-form-container">
        <h2>{form.id ? "Sửa khách sạn" : "Thêm khách sạn"}</h2>
        <form className="hotelmanagement-form" onSubmit={handleSubmit}>
          <label>Tên khách sạn:</label>
          <input name="name" value={form.name} onChange={handleChange} required />
          <label>Địa điểm:</label>
          <input name="location" value={form.location} onChange={handleChange} required />
          <label>Trạng thái:</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Hoạt động</option>
            <option>Đang bảo trì</option>
            <option>Ngừng hoạt động</option>
          </select>
          <button type="submit" className="hotelmanagement-save-btn">{form.id ? "Cập nhật" : "Lưu"}</button>
          <button type="button" className="hotelmanagement-cancel-btn" onClick={onCancel}>Hủy</button>
        </form>
      </div>
    </div>
  );
}

export default HotelManagement;