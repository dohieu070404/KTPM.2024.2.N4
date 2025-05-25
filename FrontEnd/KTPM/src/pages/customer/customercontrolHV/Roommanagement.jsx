import React, { useState, useRef, useEffect } from "react";
import "./Roommanagement.css";

const initialRooms = [
  {
    id: 1,
    number: "101",
    type: "Deluxe",
    status: "Trống",
    description: "Phòng rộng, view biển.",
    price: 1200000,
    available: 5,
    adults: 2,
    children: 1,
    images: [
      "https://cdn1.ivivu.com/iVivu/2023/10/11/11/sunflower-hotel-nha-trang-ivivu-1-800x480.jpg"
    ]
  },
  {
    id: 2,
    number: "102",
    type: "Suite",
    status: "Đang sử dụng",
    description: "Phòng cao cấp cho gia đình.",
    price: 2000000,
    available: 2,
    adults: 4,
    children: 2,
    images: [
      "https://cdn1.ivivu.com/iVivu/2023/10/11/11/sunflower-hotel-nha-trang-ivivu-2-800x480.jpg",
      "https://cdn1.ivivu.com/iVivu/2023/10/11/11/sunflower-hotel-nha-trang-ivivu-3-800x480.jpg"
    ]
  },
];

function RoomManagement() {
  const [rooms, setRooms] = useState(initialRooms);
  const [editing, setEditing] = useState(null);
  const formOverlayRef = useRef(null);

  useEffect(() => {
    if (editing !== null && formOverlayRef.current) {
      formOverlayRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      const firstInput = formOverlayRef.current.querySelector("input, select, textarea");
      if (firstInput) firstInput.focus();
    }
  }, [editing]);

  const handleDelete = (id) => setRooms(rooms.filter((r) => r.id !== id));
  const handleEdit = (room) => setEditing(room);
  const handleSave = (room) => {
    if (room.id) {
      setRooms(rooms.map((r) => (r.id === room.id ? room : r)));
    } else {
      setRooms([...rooms, { ...room, id: Date.now() }]);
    }
    setEditing(null);
  };

  return (
    <div className="roommanagement-container">
      <h1>Quản lý phòng</h1>
      <button className="roommanagement-add-btn" onClick={() => setEditing({})}>
        + Thêm phòng
      </button>
      <table className="roommanagement-table">
        <thead>
          <tr>
            <th>Số phòng</th>
            <th>Loại phòng</th>
            <th>Mô tả</th>
            <th>Giá (VNĐ)</th>
            <th>Số lượng trống</th>
            <th>Người lớn</th>
            <th>Trẻ em</th>
            <th>Ảnh phòng</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length === 0 && (
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                Chưa có phòng nào!
              </td>
            </tr>
          )}
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.number}</td>
              <td>{room.type}</td>
              <td>{room.description}</td>
              <td>{room.price ? room.price.toLocaleString() : ""}</td>
              <td>{room.available}</td>
              <td>{room.adults}</td>
              <td>{room.children}</td>
              <td>
                {room.images && room.images.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {room.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`room-${room.number}-img${idx + 1}`}
                        style={{
                          width: 50,
                          height: 38,
                          objectFit: "cover",
                          borderRadius: 3,
                          border: "1px solid #eee"
                        }}
                      />
                    ))}
                  </div>
                )}
              </td>
              <td>{room.status}</td>
              <td>
                <button className="roommanagement-edit-btn" onClick={() => handleEdit(room)}>
                  Sửa
                </button>
                <button className="roommanagement-delete-btn" onClick={() => handleDelete(room.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editing !== null && (
        <RoomForm room={editing} onCancel={() => setEditing(null)} onSave={handleSave} overlayRef={formOverlayRef} />
      )}
    </div>
  );
}

function RoomForm({ room, onSave, onCancel, overlayRef }) {
  const [form, setForm] = useState({
    number: room.number || "",
    type: room.type || "",
    status: room.status || "Trống",
    description: room.description || "",
    price: room.price || "",
    available: room.available || "",
    adults: room.adults || "",
    children: room.children || "",
    images: room.images || [],
    newImageUrl: "",
    id: room.id,
  });

  // Thêm url ảnh mới vào danh sách
  const handleAddImageUrl = (e) => {
    e.preventDefault();
    const url = form.newImageUrl.trim();
    if (url && !form.images.includes(url)) {
      setForm((f) => ({
        ...f,
        images: [...f.images, url],
        newImageUrl: "",
      }));
    }
  };

  // Xóa một ảnh khỏi danh sách
  const handleRemoveImage = (idx) => {
    setForm((f) => ({
      ...f,
      images: f.images.filter((_, i) => i !== idx),
    }));
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleNewImageUrlChange = (e) => {
    setForm((f) => ({
      ...f,
      newImageUrl: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.number ||
      !form.type ||
      !form.description ||
      form.price === "" ||
      form.available === "" ||
      form.adults === "" ||
      form.children === ""
    ) {
      alert("Vui lòng nhập đầy đủ thông tin phòng!");
      return;
    }
    onSave({
      ...form,
      images: form.images.filter((url) => !!url),
      newImageUrl: undefined,
    });
  };

  return (
    <div className="roommanagement-form-overlay" ref={overlayRef}>
      <div className="roommanagement-form-container">
        <h2>{form.id ? "Sửa phòng" : "Thêm phòng"}</h2>
        <form className="roommanagement-form" onSubmit={handleSubmit}>
          <label>Số phòng:</label>
          <input name="number" value={form.number} onChange={handleChange} required />

          <label>Loại phòng:</label>
          <input name="type" value={form.type} onChange={handleChange} placeholder="Ví dụ: Deluxe, Suite..." required />

          <label>Mô tả:</label>
          <textarea name="description" value={form.description} onChange={handleChange} required />

          <label>Giá (VNĐ):</label>
          <input name="price" type="number" value={form.price} onChange={handleChange} min="0" required />

          <label>Số lượng phòng trống:</label>
          <input name="available" type="number" value={form.available} onChange={handleChange} min="0" required />

          <label>Số lượng người lớn:</label>
          <input name="adults" type="number" value={form.adults} onChange={handleChange} min="0" required />

          <label>Số lượng trẻ em:</label>
          <input name="children" type="number" value={form.children} onChange={handleChange} min="0" required />

          {/* Thêm nhiều ảnh bằng url */}
          <label>Ảnh phòng (URL):</label>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
            {form.images.map((img, idx) => (
              <div key={idx} style={{ position: "relative" }}>
                <img
                  src={img}
                  alt={`room-img-${idx + 1}`}
                  style={{ width: 52, height: 40, objectFit: "cover", borderRadius: 4, border: "1px solid #eee" }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  style={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    background: "#ff5858",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: 18,
                    height: 18,
                    fontSize: 12,
                    cursor: "pointer",
                    lineHeight: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                  }}
                  title="Xóa ảnh"
                  tabIndex={-1}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
            <input
              type="url"
              name="newImageUrl"
              value={form.newImageUrl}
              onChange={handleNewImageUrlChange}
              placeholder="Nhập URL ảnh và nhấn Thêm"
              style={{ flex: 1 }}
            />
            <button
              type="button"
              onClick={handleAddImageUrl}
              style={{
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "6px 12px",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Thêm
            </button>
          </div>

          <label>Trạng thái:</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Trống</option>
            <option>Đang sử dụng</option>
            <option>Bảo trì</option>
          </select>
          <button type="submit" className="roommanagement-save-btn">
            {form.id ? "Cập nhật" : "Lưu"}
          </button>
          <button type="button" className="roommanagement-cancel-btn" onClick={onCancel}>
            Hủy
          </button>
        </form>
      </div>
    </div>
  );
}

export default RoomManagement;