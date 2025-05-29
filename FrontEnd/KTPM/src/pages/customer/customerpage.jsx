import { useState } from 'react';
import './customerpage.css';

import CustomerSuport from './customercontrol/CustomerSuport';
import CusHotelManagement from './customercontrol/CusHotelManagement';
import RevenueManagement from './customercontrol/RevenueManagement';
import RoomManagement from './customercontrol/RoomManagement';
import '../../styles/icondesigns.css'
import AdminDashboard from '../admin/admincontrol/adminDashboard';
import CustomerDashboard from './customercontrol/CustomerDashboard';

// Các component đại diện cho từng tab
// const Dashboard = () => <div>Dashboard Content</div>;
// const CusHotelManagementManagement = () => <div>Quản lý tài khoản Content</div>;
// const CustomerManagement = () => <div>Quản lý khách hàng Content</div>;
// const RevenueManagementManagement = () => <div>Quản lý người dùng Content</div>;
// const Revenue = () => <div>Doanh Thu Content</div>;
// const Complaints = () => <div>Xử lý khiếu nại Content</div>;
// const CustomerSuport Center = () => <div>CustomerSuport  Center Content</div>;

const CustomerPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
  
    <div className="customer-page-container">
      <div className="customer-sidebar">
        {/* <div className="customer-logo">logo</div> */}
        <div  className='customer-logo' style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px'}}>
          <img src="/assets/logopage.jpg" alt="" />
          <span style={{ fontSize: '18px', color: 'white', fontWeight: 'bold' }}>CUSTOMER</span>
        </div>
        <div className="customer-nav-menu">
          <a 
            href="#" 
            className={`customer-nav-item ${activeTab === "dashboard" ? "customer-active" : ""}`}
            onClick={() => handleTabClick("dashboard")}
          >
            <i className="fas fa-home"></i>
            <span>Home</span>
          </a>
          <a 
            href="#" 
            className={`customer-nav-item ${activeTab === "CusHotelManagement" ? "customer-active" : ""}`}
            onClick={() => handleTabClick("CusHotelManagement")}
          >
            <i className="fas fa-RevenueManagement-circle"></i>
            <span>Quản lý khách sạn </span>
          </a>
          <a 
            href="#" 
            className={`customer-nav-item ${activeTab === "RoomManagement" ? "customer-active" : ""}`}
            onClick={() => handleTabClick("RoomManagement")}
          >
            <i className="fas fa-wallet"></i>
            <span>Quản lý Phòng </span>
          </a>
          {/* <a 
            href="#" 
            className={`customer-nav-item ${activeTab === "RevenueManagement" ? "customer-active" : ""}`}
            onClick={() => handleTabClick("RevenueManagement")}
          >
            <i className="fas fa-sliders-h"></i>
            <span>Quản lý người dùng</span>
          </a> */}
          <a 
            href="#" 
            className={`customer-nav-item ${activeTab === "RevenueManagement" ? "customer-active" : ""}`}
            onClick={() => handleTabClick("RevenueManagement")}
          >
            <i className="fas fa-comment-dots"></i>
            <span>Doanh Thu</span>
          </a>
          
          <a 
            href="#" 
            className={`customer-nav-item ${activeTab === "CustomerSuport " ? "customer-active" : ""}`}
            onClick={() => handleTabClick("CustomerSuport ")}
          >
            <i className="fas fa-life-ring"></i>
            <span>Xử lý khiếu nại</span>
          </a>
        </div>
        <div className='Customer-page-control-logout'>
        <a>Logout</a>
        </div>
      </div>
      <div className="customer-page-content-box">
        {/* Render nội dung tương ứng với activeTab */}
        {activeTab === "dashboard" && <CustomerDashboard/>}
        {activeTab === "CusHotelManagement" && <CusHotelManagement/>}
        {activeTab === "RoomManagement" && <RoomManagement />}
        {activeTab === "RevenueManagement" && <RevenueManagement />}
        
        {activeTab === "CustomerSuport " && <CustomerSuport  />}
      </div>
     
    </div>
    
</>
  );
};

export default CustomerPage;
