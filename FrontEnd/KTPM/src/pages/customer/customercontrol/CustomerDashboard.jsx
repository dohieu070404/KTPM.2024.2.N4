import React, { useState } from 'react';
import './CustomerDashboard.css';

const initialServices = [
  { id: 1, type: 'hotel', name: 'Khách sạn Sunflower', location: 'Nha Trang', price: 1200000 },
  { id: 2, type: 'flight', name: 'Vé máy bay Bamboo', location: 'Hà Nội - Đà Nẵng', price: 900000 },
];

function CustomerDashboard() {
  const [services, setServices] = useState(initialServices);
  const [editing, setEditing] = useState(null);

  const handleDelete = (id) => {
    setServices(services.filter(s => s.id !== id));
  };

  const handleEdit = (service) => setEditing(service);

  const handleSave = (newService) => {
    if (newService.id) {
      setServices(services.map(s => (s.id === newService.id ? newService : s)));
    } else {
      setServices([...services, { ...newService, id: Date.now() }]);
    }
    setEditing(null);
  };

  return (
    <div className="customer-dashboard-container">
      <h1>Quản lý dịch vụ của bạn</h1>
      <button className="customer-add-btn" onClick={() => setEditing({})}>+ Thêm dịch vụ mới</button>
      <table className="customer-table">
        <thead>
          <tr>
            <th>Loại</th>
            <th>Tên dịch vụ</th>
            <th>Khu vực / Tuyến</th>
            <th>Giá (VNĐ)</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {services.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center' }}>Chưa có dịch vụ nào!</td>
            </tr>
          )}
          {services.map(service => (
            <tr key={service.id}>
              <td>{service.type === 'hotel' ? 'Khách sạn' : 'Vé máy bay'}</td>
              <td>{service.name}</td>
              <td>{service.location}</td>
              <td>{service.price.toLocaleString()}</td>
              <td>
                <button className="customer-edit-btn" onClick={() => handleEdit(service)}>Sửa</button>
                <button className="customer-delete-btn" onClick={() => handleDelete(service.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editing !== null &&
        <CustomerForm
          service={editing}
          onCancel={() => setEditing(null)}
          onSave={handleSave}
        />
      }
    </div>
  );
}

function CustomerForm({ service, onSave, onCancel }) {
  const [form, setForm] = useState({
    type: service.type || 'hotel',
    name: service.name || '',
    location: service.location || '',
    price: service.price || '',
    id: service.id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === "price" ? Number(value) : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.location || !form.price) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    onSave(form);
  };

  return (
    <div className="customer-form-overlay">
      <div className="customer-form-container">
        <h2>{form.id ? "Sửa dịch vụ" : "Thêm dịch vụ mới"}</h2>
        <form className="customer-form" onSubmit={handleSubmit}>
          <label>Loại dịch vụ:</label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="hotel">Khách sạn</option>
            <option value="flight">Vé máy bay</option>
          </select>
          <label>Tên dịch vụ:</label>
          <input name="name" value={form.name} onChange={handleChange} required />
          <label>Khu vực/Tuyến:</label>
          <input name="location" value={form.location} onChange={handleChange} required />
          <label>Giá (VNĐ):</label>
          <input name="price" type="number" value={form.price} onChange={handleChange} required min="0" />
          <button type="submit" className="customer-save-btn">{form.id ? "Cập nhật" : "Lưu dịch vụ"}</button>
          <button type="button" className="customer-cancel-btn" onClick={onCancel}>Hủy</button>
        </form>
      </div>
    </div>
  );
}

export default CustomerDashboard;