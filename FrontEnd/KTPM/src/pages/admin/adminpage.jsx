import { useState } from 'react';
import './adminpage.css';

import AdminDashboard from './admincontrol/adminDashboard';
import AccountManagement from './admincontrol/AccountManagement';
import CustomerManagement from './admincontrol/CustomerManagement';
import UserManagement from './admincontrol/UserManagement';
import AminHelpCenter from './admincontrol/AminHelpCenter';
import '../../styles/icondesigns.css'

// Các component đại diện cho từng tab
// const Dashboard = () => <div>Dashboard Content</div>;
// const AccountManagement = () => <div>Quản lý tài khoản Content</div>;
// const CustomerManagement = () => <div>Quản lý khách hàng Content</div>;
// const UserManagement = () => <div>Quản lý người dùng Content</div>;
// const Revenue = () => <div>Doanh Thu Content</div>;
// const Complaints = () => <div>Xử lý khiếu nại Content</div>;
// const HelpCenter = () => <div>Help Center Content</div>;

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
  
    <div className="admin-page-container">
      <div className="admin-sidebar">
        {/* <div className="admin-logo">logo</div> */}
        <div  className='admin-logo'>
      <img src="/assets/logopage.jpg" alt="" />
      </div>
        <div className="admin-nav-menu">
          <a 
            href="#" 
            className={`admin-nav-item ${activeTab === "dashboard" ? "admin-active" : ""}`}
            onClick={() => handleTabClick("dashboard")}
          >
            <i className="fas fa-home"></i>
            <span>Home</span>
          </a>
          <a 
            href="#" 
            className={`admin-nav-item ${activeTab === "account" ? "admin-active" : ""}`}
            onClick={() => handleTabClick("account")}
          >
            <i className="fas fa-user-circle"></i>
            <span>Quản lý tài khoản</span>
          </a>
          <a 
            href="#" 
            className={`admin-nav-item ${activeTab === "customer" ? "admin-active" : ""}`}
            onClick={() => handleTabClick("customer")}
          >
            <i className="fas fa-wallet"></i>
            <span>Quản lý khách hàng</span>
          </a>
          <a 
            href="#" 
            className={`admin-nav-item ${activeTab === "user" ? "admin-active" : ""}`}
            onClick={() => handleTabClick("user")}
          >
            <i className="fas fa-sliders-h"></i>
            <span>Quản lý người dùng</span>
          </a>
          <a 
            href="#" 
            className={`admin-nav-item ${activeTab === "revenue" ? "admin-active" : ""}`}
            onClick={() => handleTabClick("revenue")}
          >
            <i className="fas fa-comment-dots"></i>
            <span>Doanh Thu</span>
          </a>
          
          <a 
            href="#" 
            className={`admin-nav-item ${activeTab === "help" ? "admin-active" : ""}`}
            onClick={() => handleTabClick("help")}
          >
            <i className="fas fa-life-ring"></i>
            <span>Xử lý khiếu nại</span>
          </a>
        </div>
        <div className='Admin-page-control-logout'>
        <a>logout</a>
        </div>
      </div>
      <div className="admin-page-content-box">
        {/* Render nội dung tương ứng với activeTab */}
        {activeTab === "dashboard" && <AdminDashboard />}
        {activeTab === "account" && <AccountManagement />}
        {activeTab === "customer" && <CustomerManagement />}
        {activeTab === "user" && <UserManagement />}
        
        {activeTab === "help" && <AminHelpCenter />}
      </div>
     
    </div>
    
</>
  );
};

export default AdminPage;
