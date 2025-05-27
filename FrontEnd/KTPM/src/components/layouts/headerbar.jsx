import React, { useEffect, useState } from "react";
import { CustomDropdown } from "../designs/customdropdown";
import "./headerbar.css";
import "/src/styles/icondesigns.css";
import { Link, useNavigate } from "react-router-dom";

const HeaderBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");
    if (token) {
      setUserName(name || "User");
      setRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleRequestCustomer = async () => {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  console.log("🔐 Token hiện tại:", token);

  if (!token || !name || !email || name === "undefined" || email === "undefined") {
    return alert("Thiếu thông tin người dùng hoặc chưa đăng nhập lại.");
  }

  try {
    console.log("Gửi yêu cầu Customer với:", { name, email });
    const response = await fetch("http://localhost:8080/bookingtravel/customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        email
      }),
    });

    const result = await response.json();
    console.log("✅ Server response:", result);
    
    if (result.code === 1000) {
      alert("Gửi yêu cầu thành công!");
    } else {
      alert(result.message || "Gửi yêu cầu thất bại.");
    }
  } catch (error) {
    console.error("Lỗi gửi yêu cầu:", error);
    alert("Lỗi hệ thống.");
  }
};

  // Danh sách item hiển thị tuỳ trạng thái login
  const dropdownItems = userName
    ? [
        { label: `Hi, ${userName}`, action: null },
        ...(role === "USER" ? [{ label: "Request to be Customer", action: handleRequestCustomer }] : []),
        { label: "Logout", action: handleLogout },
      ]
    : [
        { label: "Login", action: () => navigate("/login") },
        { label: "Register", action: () => navigate("/register") },
      ];

  return (
    <div className={`headerbar-icon ${scrolled ? "scrolled" : ""}`}>
      <div className="headerbar-icon-logopage">
        <Link to="/">
          <img src="/assets/logopage.jpg" alt="" />
        </Link>
      </div>

      <div className='headerbar-item'>
        <ul>
        <li>
        <Link to="/HoltelPage" className='headerbar-btn headerbar-btn-white headerbar-btn-animated'>Khách sạn </Link>
        </li>
        <li>
            <Link to="/TransportBookingPage" className='headerbar-btn headerbar-btn-white headerbar-btn-animated'>Phương tiện </Link>
        </li>
        <li>
            <Link to="/ComboSearchPage" className='headerbar-btn headerbar-btn-white headerbar-btn-animated'>Combo siu rẻ </Link>
        </li>
        <li>
            <Link to="/TourPage" className='headerbar-btn headerbar-btn-white headerbar-btn-animated'>Đặt Tour </Link>
        </li>
        </ul>
      </div>

      <div className="headerbar-icon-user">
        <CustomDropdown
          label={<span className="icon-user-account headerbar-icon-user-color" />}
          items={dropdownItems}
        />

      </div>
       {/* <div href='#' className='headerbar-icon-user '>
        <CustomDropdown
          label={<span className="icon-user-account headerbar-icon-user-color" />}
          items={['logout ', 'Gửi Request ']}
        />
      </div> */}
    </div>
  );
};

export default HeaderBar;
