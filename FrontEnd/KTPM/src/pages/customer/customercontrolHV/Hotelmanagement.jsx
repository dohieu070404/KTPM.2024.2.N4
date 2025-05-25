import React, { useState } from "react";
import "./HotelManagement.css";

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
    <div className="hm-bg">
      <div className="hm-main-layout">
        {/* Filter Box */}
        <div className="hm-filter-box">
          <h3>BỘ LỌC KHÁCH SẠN</h3>
          <div className="hm-filter-section">
            <div className="hm-filter-label">Trạng thái:</div>
            <label className="hm-checkbox">
              <input type="checkbox" checked readOnly /> Hoạt động
            </label>
            <label className="hm-checkbox">
              <input type="checkbox" checked readOnly /> Đang bảo trì
            </label>
            <label className="hm-checkbox">
              <input type="checkbox" checked readOnly /> Ngừng hoạt động
            </label>
          </div>
        </div>
        {/* Hotel List */}
        <div className="hm-hotel-list-area">
          <div className="hm-hotel-list-header">
            <h1>Quản lý khách sạn</h1>
            <button className="hm-add-btn" onClick={() => setEditing({})}>+ Thêm khách sạn</button>
          </div>
          <div className="hm-hotel-list">
            {hotels.length === 0 && (
              <div className="hm-no-hotel">Chưa có khách sạn nào!</div>
            )}
            {hotels.map(hotel => (
              <div className="hm-hotel-card" key={hotel.id}>
                <div className="hm-hotel-main">
                  <div>
                    <div className="hm-hotel-name">{hotel.name}</div>
                    <div className="hm-hotel-location">{hotel.location}</div>
                  </div>
                  <div className={`hm-hotel-status status-${hotel.status.replace(/\s/g, "").toLowerCase()}`}>{hotel.status}</div>
                </div>
                <div className="hm-hotel-actions">
                  <button className="hm-edit-btn" onClick={() => handleEdit(hotel)}>Sửa</button>
                  <button className="hm-delete-btn" onClick={() => handleDelete(hotel.id)}>Xóa</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
    <div className="hm-form-overlay">
      <div className="hm-form-container">
        <h2>{form.id ? "Sửa khách sạn" : "Thêm khách sạn"}</h2>
        <form className="hm-form" onSubmit={handleSubmit}>
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
          <button type="submit" className="hm-save-btn">{form.id ? "Cập nhật" : "Lưu"}</button>
          <button type="button" className="hm-cancel-btn" onClick={onCancel}>Hủy</button>
        </form>
      </div>
    </div>
  );
}

export default HotelManagement;