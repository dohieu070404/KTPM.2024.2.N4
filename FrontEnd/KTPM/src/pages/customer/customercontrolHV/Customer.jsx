import React, { useState, useRef, useEffect } from 'react';
import './Customer.css';

const HOTEL_AMENITIES = [
  "Wifi miễn phí",
  "Bữa sáng miễn phí",
  "Hồ bơi",
  "Phòng gym",
  "Dịch vụ đưa đón sân bay",
  "Spa",
  "Bãi đỗ xe",
  "Nhà hàng",
];

const initialServices = [
  {
    id: 1,
    type: 'hotel',
    name: 'Khách sạn Sunflower',
    description: 'Khách sạn ven biển',
    address: '123 Trần Phú',
    city: 'Nha Trang',
    website: 'https://sunflowerhotel.vn',
    phone: '0123456789',
    openTime: '06:00 - 23:00',
    amenities: ["Wifi miễn phí", "Bữa sáng miễn phí"],
    price: 1200000,
    image: 'https://cdn1.ivivu.com/iVivu/2023/10/11/11/sunflower-hotel-nha-trang-ivivu-1-800x480.jpg'
  },
  {
    id: 2,
    type: 'flight',
    brand: 'Bamboo Airways',
    name: 'Vé máy bay Bamboo',
    from: 'Hà Nội',
    to: 'Đà Nẵng',
    time: '08:00 - 09:20',
    price: 900000
  },
  {
    id: 3,
    type: 'bus',
    brand: 'Phương Trang',
    name: 'Vé xe khách Phương Trang',
    from: 'Hồ Chí Minh',
    to: 'Đà Lạt',
    time: '07:00 - 14:00',
    price: 350000
  }
];

const SERVICE_TYPES = [
  { label: "Khách sạn", value: "hotel" },
  { label: "Vé máy bay", value: "flight" },
  { label: "Vé xe khách", value: "bus" }
];

function CustomerDashboard() {
  const [services, setServices] = useState(initialServices);
  const [editing, setEditing] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState(SERVICE_TYPES.map(x => x.value));
  const formOverlayRef = useRef(null);

  useEffect(() => {
    if (editing !== null && formOverlayRef.current) {
      formOverlayRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const firstInput = formOverlayRef.current.querySelector('input, select, textarea');
      if (firstInput) firstInput.focus();
    }
  }, [editing]);

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

  const handleTypeFilterChange = (typeValue) => {
    setSelectedTypes(prev =>
      prev.includes(typeValue)
        ? prev.filter(t => t !== typeValue)
        : [...prev, typeValue]
    );
  };

  // Lọc dịch vụ dựa theo selectedTypes
  const filteredServices = services.filter(service => selectedTypes.includes(service.type));

  return (
    <div className="cds-bg">
      <div className="cds-main-layout">
        {/* Bộ lọc */}
        <div className="cds-filter-box">
          <h3>BỘ LỌC DỊCH VỤ</h3>
          <div className="cds-filter-section">
            <div className="cds-filter-label">Loại dịch vụ:</div>
            {SERVICE_TYPES.map(type => (
              <label key={type.value} className="cds-checkbox">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type.value)}
                  onChange={() => handleTypeFilterChange(type.value)}
                /> {type.label}
              </label>
            ))}
          </div>
        </div>

        {/* Danh sách dịch vụ */}
        <div className="cds-service-list-area">
          <div className="cds-service-list-header">
            <h1>Quản lý dịch vụ của bạn</h1>
            <button className="cds-add-btn" onClick={() => setEditing({})}>+ Thêm dịch vụ mới</button>
          </div>
          <div className="cds-service-list">
            {filteredServices.length === 0 ? (
              <div className="cds-no-service">Chưa có dịch vụ nào!</div>
            ) : (
              filteredServices.map(service => (
                <div className="cds-service-card" key={service.id}>
                  <div className="cds-service-main">
                    <div>
                      <div className="cds-service-type">
                        {service.type === 'hotel' && 'Khách sạn'}
                        {service.type === 'flight' && 'Vé máy bay'}
                        {service.type === 'bus' && 'Vé xe khách'}
                      </div>
                      <div className="cds-service-name">{service.name}</div>
                    </div>
                    <div className="cds-service-price">
                      {service.price ? service.price.toLocaleString() + " đ" : ""}
                    </div>
                  </div>
                  <div className="cds-service-detail">
                    {service.type === 'hotel' ? (
                      <>
                        {service.image &&
                          <div style={{ marginBottom: 6 }}>
                            <img src={service.image} alt={service.name} style={{ width: 100, height: 65, objectFit: 'cover', borderRadius: 4, border: '1px solid #eee' }} />
                          </div>
                        }
                        <div><b>Địa chỉ:</b> {service.address}</div>
                        <div><b>Thành phố:</b> {service.city}</div>
                        <div><b>Website:</b> <a href={service.website} target="_blank" rel="noopener noreferrer">{service.website}</a></div>
                        <div><b>SĐT:</b> {service.phone}</div>
                        <div><b>Mô tả:</b> {service.description}</div>
                        <div><b>Thời gian hoạt động:</b> {service.openTime}</div>
                        <div><b>Tiện ích:</b> {service.amenities?.join(', ')}</div>
                      </>
                    ) : (
                      <>
                        <div><b>Tên hãng:</b> {service.brand}</div>
                        <div><b>Điểm đi:</b> {service.from}</div>
                        <div><b>Điểm đến:</b> {service.to}</div>
                        <div><b>Thời gian:</b> {service.time}</div>
                      </>
                    )}
                  </div>
                  <div className="cds-service-actions">
                    <button className="cds-edit-btn" onClick={() => handleEdit(service)}>Sửa</button>
                    <button className="cds-delete-btn" onClick={() => handleDelete(service.id)}>Xóa</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Tổng hợp đơn */}
        <div className="cds-order-summary">
          <h3>Tổng số dịch vụ</h3>
          <div className="cds-order-total">
            <span>Tổng dịch vụ:</span>
            <span className="cds-total-number">{filteredServices.length}</span>
          </div>
          <button className="cds-btn cds-btn-confirm" disabled>Xác nhận</button>
        </div>
      </div>

      {/* Overlay Form */}
      {editing !== null &&
        <CustomerForm
          service={editing}
          onCancel={() => setEditing(null)}
          onSave={handleSave}
          overlayRef={formOverlayRef}
        />
      }
    </div>
  );
}

function CustomerForm({ service, onSave, onCancel, overlayRef }) {
  const isEditMode = !!service.id;

  const [form, setForm] = useState({
    type: service.type || 'hotel',
    name: service.name || '',
    price: service.price || '',
    id: service.id,
    image: service.image || '',
    description: service.description || '',
    address: service.address || '',
    city: service.city || '',
    website: service.website || '',
    phone: service.phone || '',
    openTime: service.openTime || '',
    amenities: service.amenities || [],
    brand: service.brand || '',
    from: service.from || '',
    to: service.to || '',
    time: service.time || '',
  });

  useEffect(() => {
    // Khi chuyển sang thêm dịch vụ mới thì reset form về loại đang filter đầu tiên (nếu đang bỏ tích hết thì mặc định là hotel)
    if (!isEditMode) {
      setForm(f => ({
        ...f,
        type: service.type || 'hotel'
      }));
    }
    // eslint-disable-next-line
  }, [service]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "amenities") {
      if (checked) {
        setForm(f => ({ ...f, amenities: [...f.amenities, value] }));
      } else {
        setForm(f => ({ ...f, amenities: f.amenities.filter(a => a !== value) }));
      }
    } else if (name === "price") {
      setForm(f => ({ ...f, [name]: Number(value) }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.type === "hotel") {
      if (!form.name || !form.description || !form.address || !form.city || !form.website || !form.phone || !form.openTime || !form.price) {
        alert("Vui lòng nhập đầy đủ thông tin khách sạn!");
        return;
      }
    } else if (form.type === "flight" || form.type === "bus") {
      if (!form.name || !form.brand || !form.from || !form.to || !form.time || !form.price) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
      }
    }
    onSave(form);
  };

  return (
    <div className="cds-form-overlay" ref={overlayRef}>
      <div className="cds-form-container">
        <h2>{form.id ? "Sửa dịch vụ" : "Thêm dịch vụ mới"}</h2>
        <form className="cds-form" onSubmit={handleSubmit}>
          <label>Loại dịch vụ:</label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="hotel">Khách sạn</option>
            <option value="flight">Vé máy bay</option>
            <option value="bus">Vé xe khách</option>
          </select>
          <label>Tên dịch vụ:</label>
          <input name="name" value={form.name} onChange={handleChange} required />

          {form.type === "hotel" && (
            <>
              {isEditMode && (
                <>
                  <label>Ảnh khách sạn (URL):</label>
                  <input name="image" value={form.image} onChange={handleChange} placeholder="Dán link ảnh khách sạn..." />
                  {form.image && (
                    <div style={{ marginBottom: 10 }}>
                      <img src={form.image} alt="preview" style={{ width: 180, height: 120, objectFit: 'cover', borderRadius: 6, border: '1px solid #eee', marginTop: 6 }} />
                    </div>
                  )}
                </>
              )}
              <label>Mô tả khách sạn:</label>
              <textarea name="description" value={form.description} onChange={handleChange} required />
              <label>Địa chỉ:</label>
              <input name="address" value={form.address} onChange={handleChange} required />
              <label>Thành phố:</label>
              <input name="city" value={form.city} onChange={handleChange} required />
              <label>Địa chỉ website:</label>
              <input name="website" value={form.website} onChange={handleChange} required />
              <label>Số điện thoại:</label>
              <input name="phone" value={form.phone} onChange={handleChange} required />
              <label>Thời gian hoạt động:</label>
              <input name="openTime" value={form.openTime} onChange={handleChange} placeholder="VD: 06:00 - 23:00" required />
              <label>Tiện ích khách sạn:</label>
              <div className="cds-amenities-list">
                {HOTEL_AMENITIES.map(amenity => (
                  <label key={amenity} className="cds-amenity-item">
                    <input
                      type="checkbox"
                      name="amenities"
                      value={amenity}
                      checked={form.amenities.includes(amenity)}
                      onChange={handleChange}
                    />
                    {amenity}
                  </label>
                ))}
              </div>
            </>
          )}

          {(form.type === "flight" || form.type === "bus") && (
            <>
              <label>Tên hãng:</label>
              <input name="brand" value={form.brand} onChange={handleChange} required />
              <label>Điểm đi:</label>
              <input name="from" value={form.from} onChange={handleChange} required />
              <label>Điểm đến:</label>
              <input name="to" value={form.to} onChange={handleChange} required />
              <label>Thời gian:</label>
              <input name="time" value={form.time} onChange={handleChange} required placeholder="VD: 08:00 - 09:20" />
            </>
          )}
          <label>Giá (VNĐ):</label>
          <input name="price" type="number" value={form.price} onChange={handleChange} required min="0" />
          <button type="submit" className="cds-save-btn">{form.id ? "Cập nhật" : "Lưu dịch vụ"}</button>
          <button type="button" className="cds-cancel-btn" onClick={onCancel}>Hủy</button>
        </form>
      </div>
    </div>
  );
}

export default CustomerDashboard;