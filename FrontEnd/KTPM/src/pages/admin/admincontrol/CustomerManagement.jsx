import './CustomerManagement.css';
import React, { useState } from "react";

const initialPartners = [
  { 
    id: 1, 
    name: "Sunflower Hotel", 
    type: "Khách sạn", 
    address: "123 Đường Biển, Nha Trang", 
    services: 45,
    status: "Hoạt động"
  },
  { 
    id: 2, 
    name: "Phú Quốc Express", 
    type: "Nhà xe", 
    address: "789 Đường Trần Hưng Đạo, Phú Quốc", 
    services: 28,
    status: "Cảnh báo"
  },
  { 
  id: 3, 
  name: "Phú Quốc Express", 
  type: "Nhà xe", 
  address: "789 Đường Trần Hưng Đạo, Phú Quốc", 
  services: 28, 
  status: "Cảnh báo" 
},
{ 
  id: 4, 
  name: "Mai Linh Limousine", 
  type: "Nhà xe", 
  address: "12 Lê Duẩn, TP. Hồ Chí Minh", 
  services: 35, 
  status: "Cảnh báo" 
},
{ 
  id: 5, 
  name: "Golden Bay Hotel", 
  type: "Khách sạn", 
  address: "99 Nguyễn Tất Thành, Nha Trang", 
  services: 60, 
  status: "Hoạt động" 
},
{ 
  id: 6, 
  name: "Mekong Riverside Hotel", 
  type: "Khách sạn", 
  address: "55 Trần Hưng Đạo, Cần Thơ", 
  services: 33, 
  status: "Hoạt động" 
},
{ 
  id: 7, 
  name: "Hà Nội Travel Bus", 
  type: "Nhà xe", 
  address: "21 Nguyễn Trãi, Hà Nội", 
  services: 22, 
  status: "Cảnh báo" 
},
{ 
  id: 8, 
  name: "Ocean View Resort", 
  type: "Khách sạn", 
  address: "456 Trần Phú, Vũng Tàu", 
  services: 38, 
  status: "Hoạt động" 
},
{ 
  id: 9, 
  name: "Green Bamboo Hotel", 
  type: "Khách sạn", 
  address: "789 Phạm Văn Đồng, Đà Nẵng", 
  services: 50, 
  status: "Hoạt động" 
},
{ 
  id: 10, 
  name: "Lotus Central Hotel", 
  type: "Khách sạn", 
  address: "12 Hàng Bông, Hà Nội", 
  services: 41, 
  status: "Hoạt động" 
},


];

function CustomerManagement() {
  const [partners, setPartners] = useState(initialPartners);
  const [editing, setEditing] = useState(null);

  const getStatusClass = (status) => {
    switch(status) {
      case 'Hoạt động': return 'status-active';
      case 'Cảnh báo': return 'status-warning';
      case 'Dừng hoạt động': return 'status-inactive';
      default: return '';
    }
  };

  const getTypeClass = (type) => {
    switch(type) {
      case 'Khách sạn': return 'type-hotel';
      case 'Nhà xe': return 'type-transport';
      case 'Dịch vụ du lịch': return 'type-service';
      default: return '';
    }
  };

  const handleDelete = (id) => setPartners(partners.filter(p => p.id !== id));
  const handleEdit = (partner) => setEditing(partner);
  const handleSave = (partner) => {
    if (partner.id) {
      setPartners(partners.map(p => (p.id === partner.id ? partner : p)));
    } else {
      setPartners([...partners, { ...partner, id: Date.now() }]);
    }
    setEditing(null);
  };

  return (
    <div className="customer-management-container">
      <h1>Quản lý Đối tác</h1>
      <button className="customer-add-btn" onClick={() => setEditing({})}>
        <span>+</span> Thêm đối tác
      </button>
      
      <table className="customer-table">
        <thead>
          <tr>
            <th>Tên đối tác</th>
            <th>Loại hình</th>
            <th>Địa chỉ</th>
            <th>Số dịch vụ (tháng)</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {partners.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>Chưa có đối tác nào!</td>
            </tr>
          )}
          {partners.map(partner => (
            <tr key={partner.id}>
              <td>{partner.name}</td>
              <td>
                <span className={`partner-type ${getTypeClass(partner.type)}`}>
                  {partner.type}
                </span>
              </td>
              <td>{partner.address}</td>
              <td className="service-count">{partner.services}</td>
              <td>
                <span className={`status-badge ${getStatusClass(partner.status)}`}>
                  {partner.status}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button className="edit-btn" onClick={() => handleEdit(partner)}>
                    Sửa
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(partner.id)}>
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing !== null &&
        <PartnerForm
          partner={editing}
          onCancel={() => setEditing(null)}
          onSave={handleSave}
        />
      }
    </div>
  );
}

function PartnerForm({ partner, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: partner.name || "",
    type: partner.type || "Khách sạn",
    address: partner.address || "",
    services: partner.services || 0,
    status: partner.status || "Hoạt động",
    id: partner.id,
  });

  const handleChange = (e) => {
    const value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
    setForm(f => ({ ...f, [e.target.name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.address) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    if (form.services < 0) {
      alert("Số dịch vụ không hợp lệ!");
      return;
    }
    onSave(form);
  };

  return (
    <div className="customer-form-overlay">
      <div className="customer-form-container">
        <h2>{form.id ? "Chỉnh sửa đối tác" : "Thêm đối tác mới"}</h2>
        <form className="customer-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Tên đối tác:</label>
            <input
              className="form-input"
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Loại hình:</label>
            <select 
              className="form-input form-select"
              name="type" 
              value={form.type} 
              onChange={handleChange}
            >
              <option>Khách sạn</option>
              <option>Nhà xe</option>
              <option>Dịch vụ du lịch</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Địa chỉ:</label>
            <input
              className="form-input"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Số dịch vụ (tháng):</label>
            <input
              className="form-input"
              type="number"
              name="services"
              value={form.services}
              onChange={handleChange}
              min="0"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Trạng thái:</label>
            <select 
              className="form-input form-select"
              name="status" 
              value={form.status} 
              onChange={handleChange}
            >
              <option>Hoạt động</option>
              <option>Cảnh báo</option>
              <option>Dừng hoạt động</option>
            </select>
          </div>

          <div className="form-button-group">
            <button type="submit" className="save-btn">
              {form.id ? "Cập nhật" : "Thêm mới"}
            </button>
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Hủy bỏ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomerManagement;