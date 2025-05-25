import './AccountManagement.css'

import React, { useState } from "react";

const initialAccounts = [
  { id: 1, username: "admin01", email: "admin01@travelbooking.com", role: "Super Admin", status: "Active" },
  { id: 2, username: "manager01", email: "manager@travelbooking.com", role: "Content Manager", status: "Inactive" },
];

function AccountManagement() {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [editing, setEditing] = useState(null);

  const handleDelete = (id) => setAccounts(accounts.filter(a => a.id !== id));
  const handleEdit = (account) => setEditing(account);
  const handleSave = (account) => {
    if (account.id) {
      setAccounts(accounts.map(a => (a.id === account.id ? account : a)));
    } else {
      setAccounts([...accounts, { ...account, id: Date.now() }]);
    }
    setEditing(null);
  };

  return (
    <div className="account-management-container">
      <h1>Quản lý Tài khoản Admin</h1>
      <button className="account-add-btn" onClick={() => setEditing({})}>+ Thêm tài khoản</button>
      
      <table className="account-table">
        <thead>
          <tr>
            <th>Tên đăng nhập</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {accounts.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>Chưa có tài khoản nào!</td>
            </tr>
          )}
          {accounts.map(account => (
            <tr className='AccountManagement-list' key={account.id}>
              <td>{account.username}</td>
              <td>{account.email}</td>
              <td>{account.role}</td>
              <td>{account.status}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(account)}>Sửa</button>
                <button className="delete-btn" onClick={() => handleDelete(account.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing !== null &&
        <AccountForm
          account={editing}
          onCancel={() => setEditing(null)}
          onSave={handleSave}
        />
      }
    </div>
  );
}

function AccountForm({ account, onSave, onCancel }) {
  const [form, setForm] = useState({
    username: account.username || "",
    email: account.email || "",
    role: account.role || "Content Manager",
    status: account.status || "Active",
    id: account.id,
  });

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.email) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    if (!validateEmail(form.email)) {
      alert("Email không hợp lệ!");
      return;
    }
    onSave(form);
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2>{form.id ? "Chỉnh sửa tài khoản" : "Thêm tài khoản mới"}</h2>
        <form className="account-form" onSubmit={handleSubmit}>
          <label>Tên đăng nhập:</label>
          <input 
            name="username" 
            value={form.username} 
            onChange={handleChange} 
            required 
          />
          
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          
          <label>Vai trò:</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option>Admin</option>
            <option>Customer </option>
            <option>User</option>
          </select>
          
          <label>Trạng thái:</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Hoat dong</option>
            <option>Cảnh Báo </option>
            <option>Dừng hoạt động </option>
          </select>
          
          <div className="form-buttons">
            <button type="submit" className="save-btn">
              {form.id ? "Cập nhật" : "Tạo tài khoản"}
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

 export default AccountManagement