

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('year'); // 'year', 'month', 'week'
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'partners', 'services'

  // Dữ liệu mẫu
  const revenueData = [
    { name: 'Tháng 1', revenue: 40000000, services: 240 },
    { name: 'Tháng 2', revenue: 30000000, services: 139 },
    { name: 'Tháng 3', revenue: 20000000, services: 980 },
    { name: 'Tháng 4', revenue: 27800000, services: 390 },
    { name: 'Tháng 5', revenue: 18900000, services: 480 },
    { name: 'Tháng 6', revenue: 23900000, services: 380 },
    { name: 'Tháng 7', revenue: 34900000, services: 430 },
    { name: 'Tháng 8', revenue: 40000000, services: 210 },
    { name: 'Tháng 9', revenue: 45000000, services: 350 },
    { name: 'Tháng 10', revenue: 52000000, services: 480 },
    { name: 'Tháng 11', revenue: 48000000, services: 420 },
    { name: 'Tháng 12', revenue: 55000000, services: 510 },
  ];

  const partnerGrowth = [
    { name: 'Tháng 1', partners: 10 },
    { name: 'Tháng 2', partners: 15 },
    { name: 'Tháng 3', partners: 22 },
    { name: 'Tháng 4', partners: 30 },
    { name: 'Tháng 5', partners: 35 },
    { name: 'Tháng 6', partners: 42 },
    { name: 'Tháng 7', partners: 50 },
    { name: 'Tháng 8', partners: 58 },
    { name: 'Tháng 9', partners: 65 },
    { name: 'Tháng 10', partners: 72 },
    { name: 'Tháng 11', partners: 80 },
    { name: 'Tháng 12', partners: 90 },
  ];

  const serviceDistribution = [
    { name: 'Máy bay', value: 45 },
    { name: 'Xe khách', value: 30 },
    { name: 'Khách sạn', value: 15 },
    { name: 'Tour', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Tổng hợp số liệu
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalPartners = partnerGrowth[partnerGrowth.length - 1].partners;
  const totalServices = revenueData.reduce((sum, item) => sum + item.services, 0);
  const newPartnersThisMonth = partnerGrowth[partnerGrowth.length - 1].partners - partnerGrowth[partnerGrowth.length - 2].partners;

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Bảng điều khiển quản trị</h1>
        <div className="time-range-selector">
          <button 
            className={`time-btn ${timeRange === 'year' ? 'active' : ''}`}
            onClick={() => setTimeRange('year')}
          >
            Năm
          </button>
          <button 
            className={`time-btn ${timeRange === 'month' ? 'active' : ''}`}
            onClick={() => setTimeRange('month')}
          >
            Tháng
          </button>
          <button 
            className={`time-btn ${timeRange === 'week' ? 'active' : ''}`}
            onClick={() => setTimeRange('week')}
          >
            Tuần
          </button>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Tổng quan
        </button>
        <button 
          className={`tab-btn ${activeTab === 'partners' ? 'active' : ''}`}
          onClick={() => setActiveTab('partners')}
        >
          Đối tác
        </button>
        <button 
          className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          Dịch vụ
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="dashboard-content">
          <div className="stats-cards">
            <div className="stat-card">
              <h3>Doanh thu</h3>
              <p className="stat-value">{totalRevenue.toLocaleString()} ₫</p>
              <p className="stat-change">+12% so với tháng trước</p>
            </div>
            
            <div className="stat-card">
              <h3>Tổng đối tác</h3>
              <p className="stat-value">{totalPartners}</p>
              <p className="stat-change">+{newPartnersThisMonth} tháng này</p>
            </div>
            
            <div className="stat-card">
              <h3>Dịch vụ đã bán</h3>
              <p className="stat-value">{totalServices}</p>
              <p className="stat-change">+8% so với tháng trước</p>
            </div>
            
            <div className="stat-card">
              <h3>Tỉ lệ hoàn thành</h3>
              <p className="stat-value">98%</p>
              <p className="stat-change">+2% so với tháng trước</p>
            </div>
          </div>

          <div className="charts-row">
            <div className="chart-container">
              <h3>Doanh thu theo tháng</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => value.toLocaleString()} />
                  <Legend />
                  <Bar dataKey="revenue" name="Doanh thu (VND)" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-container">
              <h3>Tăng trưởng đối tác</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={partnerGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="partners" name="Số đối tác" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'partners' && (
        <div className="dashboard-content">
          <div className="partners-stats">
            <div className="partners-overview">
              <h3>Thống kê đối tác</h3>
              <div className="partner-stats-grid">
                <div className="partner-stat">
                  <h4>Tổng số đối tác</h4>
                  <p>{totalPartners}</p>
                </div>
                <div className="partner-stat">
                  <h4>Đối tác mới tháng này</h4>
                  <p>{newPartnersThisMonth}</p>
                </div>
                <div className="partner-stat">
                  <h4>Đối tác máy bay</h4>
                  <p>25</p>
                </div>
                <div className="partner-stat">
                  <h4>Đối tác xe khách</h4>
                  <p>45</p>
                </div>
                <div className="partner-stat">
                  <h4>Đối tác khách sạn</h4>
                  <p>15</p>
                </div>
                <div className="partner-stat">
                  <h4>Đối tác tour</h4>
                  <p>5</p>
                </div>
              </div>
            </div>

            <div className="chart-container full-width">
              <h3>Tăng trưởng đối tác theo tháng</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={partnerGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="partners" name="Số đối tác" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'services' && (
        <div className="dashboard-content">
          <div className="services-stats">
            <div className="services-overview">
              <h3>Thống kê dịch vụ</h3>
              <div className="service-stats-grid">
                <div className="service-stat">
                  <h4>Tổng dịch vụ đã bán</h4>
                  <p>{totalServices}</p>
                </div>
                <div className="service-stat">
                  <h4>Dịch vụ tháng này</h4>
                  <p>{revenueData[revenueData.length - 1].services}</p>
                </div>
                <div className="service-stat">
                  <h4>Máy bay</h4>
                  <p>1200</p>
                </div>
                <div className="service-stat">
                  <h4>Xe khách</h4>
                  <p>800</p>
                </div>
                <div className="service-stat">
                  <h4>Khách sạn</h4>
                  <p>400</p>
                </div>
                <div className="service-stat">
                  <h4>Tour</h4>
                  <p>200</p>
                </div>
              </div>
            </div>

            <div className="charts-row">
              <div className="chart-container">
                <h3>Doanh thu dịch vụ theo tháng</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => value.toLocaleString()} />
                    <Legend />
                    <Bar dataKey="revenue" name="Doanh thu (VND)" fill="#8884d8" />
                    <Bar dataKey="services" name="Số dịch vụ" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-container">
                <h3>Phân bố dịch vụ</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={serviceDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {serviceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


 export default AdminDashboard;