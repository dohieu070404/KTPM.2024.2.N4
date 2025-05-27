import React, { useState } from "react";
import "./login.css";
import { jwtDecode } from "jwt-decode"
const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Data gửi đi:", formData);
      const response = await fetch("http://localhost:8080/bookingtravel/auth/log-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: formData.username,
          password: formData.password,
        }),
      });

      const result = await response.json();
      console.log("Kết quả từ backend:", result);

      if (result.code === 0 && result.result?.token) {
        localStorage.setItem("token", result.result.token);
        alert("Đăng nhập thành công!");
        try {
        const decodedToken = jwtDecode(localStorage.getItem("token"));
        // Lấy role từ trường 'scope'
        const userRole = decodedToken.scope; // userRole sẽ có giá trị là "ROLE_ADMIN"
        const roleName=decodedToken.scope;
        localStorage.setItem("role",roleName);
        console.log("Vai trò người dùng:", userRole);
        if(roleName === "ROLE_ADMIN"){
          window.location.href = "/adminpage";
        }else if(roleName === "ROLE_USER"){
          window.location.href = "/"
        }else {
          window.location.href = "/customerpage"
        }
        // Sử dụng userRole cho các mục đích khác (lưu trữ, điều hướng, ...)
        localStorage.setItem("userRole", userRole);
        } catch (error) {
          console.error("Lỗi giải mã token:", error);
        }
      } else {
        alert("Đăng nhập thất bại: Đăng nhập sai hoặc hệ thống lỗi");
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      alert("Lỗi hệ thống. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg"></div>

      <main className="form-signin">
        <h1 className="h3">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-floating">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-floating">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-check">
            <input type="checkbox" id="rememberMeSwitch" name="remember_me" />
            <label htmlFor="rememberMeSwitch">Remember me</label>
          </div>

          <button type="submit" className="btn">Sign in</button>
        </form>

        <p className="copyright">&copy; 2025 by VIVUGO</p>
      </main>
    </div>
  );
};

export default LoginPage;
