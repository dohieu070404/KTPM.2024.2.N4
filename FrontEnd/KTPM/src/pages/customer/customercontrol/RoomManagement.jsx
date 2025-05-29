import React, { useState, useRef, useEffect } from "react";
import "./RoomManagement.css";

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

const ROOM_STATUSES = [
  { label: "Trống", value: "Trống" },
  { label: "Đang sử dụng", value: "Đang sử dụng" },
  { label: "Bảo trì", value: "Bảo trì" }
];

function RoomManagement() {
  const [rooms, setRooms] = useState(initialRooms);
  const [editing, setEditing] = useState(null);
  const formOverlayRef = useRef(null);

  // Bộ lọc trạng thái và loại phòng
  const [filterStatuses, setFilterStatuses] = useState(ROOM_STATUSES.map(s => s.value));
  const [filterType, setFilterType] = useState("");

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

  // Lọc phòng theo trạng thái và loại phòng
  const filteredRooms = rooms.filter(room =>
    filterStatuses.includes(room.status) &&
    room.type.toLowerCase().includes(filterType.trim().toLowerCase())
  );

  // Xử lý chọn/bỏ lọc trạng thái
  const handleStatusChange = (statusValue) => {
    setFilterStatuses(prev =>
      prev.includes(statusValue)
        ? prev.filter(s => s !== statusValue)
        : [...prev, statusValue]
    );
  };

  return (
    <div className="rm-bg">
      <div className="rm-main-layout">
        {/* Bộ lọc bên trái */}
        <div className="rm-filter-box">
          <h3>BỘ LỌC PHÒNG</h3>
          <div className="rm-filter-section">
            <div className="rm-filter-label">Trạng thái:</div>
            {ROOM_STATUSES.map(s => (
              <label className="rm-checkbox" key={s.value}>
                <input
                  type="checkbox"
                  checked={filterStatuses.includes(s.value)}
                  onChange={() => handleStatusChange(s.value)}
                />{" "}
                {s.label}
              </label>
            ))}
          </div>
          <div className="rm-filter-section">
            <div className="rm-filter-label">Loại phòng:</div>
            <input
              className="rm-filter-type"
              type="text"
              placeholder="Nhập loại phòng..."
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              style={{ width: "100%", minWidth: 0, maxWidth: "100%", fontSize: "16px"}}
            />
          </div>
        </div>
        {/* Danh sách phòng */}
        <div className="rm-room-list-area">
          <div className="rm-room-list-header">
            <h1>Quản lý phòng</h1>
            <button className="rm-add-btn" onClick={() => setEditing({})}>
              + Thêm phòng
            </button>
          </div>
          <div className="rm-room-list">
            {filteredRooms.length === 0 ? (
              <div className="rm-no-room">Chưa có phòng nào!</div>
            ) : (
              filteredRooms.map(room => (
                <div className="rm-room-card" key={room.id}>
                  <div className="rm-room-main">
                    <div>
                      <div className="rm-room-type">{room.type}</div>
                      <div className="rm-room-desc">{room.description}</div>
                    </div>
                    <div className="rm-room-detail">
                      <div>
                        <b>Giá:</b>{" "}
                        <span className="rm-room-price">
                          {room.price ? room.price.toLocaleString() + " đ" : ""}
                        </span>
                      </div>
                      <div>
                        <b>Trống:</b> {room.available}
                      </div>
                      <div>
                        <b>Người lớn:</b> {room.adults} | <b>Trẻ em:</b> {room.children}
                      </div>
                    </div>
                    <div className={`rm-room-status status-${room.status.replace(/\s/g, "").toLowerCase()}`}>
                      {room.status}
                    </div>
                  </div>
                  <div className="rm-room-imgs">
                    {room.images && room.images.length > 0 && room.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`room-img${idx + 1}`}
                        className="rm-room-img"
                      />
                    ))}
                  </div>
                  <div className="rm-room-actions">
                    <button className="rm-edit-btn" onClick={() => handleEdit(room)}>Sửa</button>
                    <button className="rm-delete-btn" onClick={() => handleDelete(room.id)}>Xóa</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {/* Form Overlay */}
      {editing !== null && (
        <RoomForm
          room={editing}
          onCancel={() => setEditing(null)}
          onSave={handleSave}
          overlayRef={formOverlayRef}
        />
      )}
    </div>
  );
}

function RoomForm({ room, onSave, onCancel, overlayRef }) {
  const isEditMode = !!room.id;
  const [form, setForm] = useState({
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
    <div className="rm-form-overlay" ref={overlayRef}>
      <div className="rm-form-container">
        <h2>{form.id ? "Sửa phòng" : "Thêm phòng"}</h2>
        <form className="rm-form" onSubmit={handleSubmit}>
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

          {isEditMode && (
            <>
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
            </>
          )}

          <label>Trạng thái:</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Trống</option>
            <option>Đang sử dụng</option>
            <option>Bảo trì</option>
          </select>
          <button type="submit" className="rm-save-btn">
            {form.id ? "Cập nhật" : "Lưu"}
          </button>
          <button type="button" className="rm-cancel-btn" onClick={onCancel}>
            Hủy
          </button>
        </form>
      </div>
    </div>
  );
}

export default RoomManagement;
