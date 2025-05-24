import React, { useState } from "react";
import "./login.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🟡 Bắt đầu xử lý login");

    // Validation đơn giản
    const errors = {};
    if (!formData.username.trim()) errors.username = "Username is required";
    if (!formData.password) errors.password = "Password is required";
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      console.log("📤 Gửi dữ liệu:", formData);
      const response = await fetch("http://localhost:8080/bookingtravel/auth/log-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: formData.username,
          password: formData.password,
        }),
      });

      const result = await response.json();
      console.log("📥 Phản hồi từ backend:", result);

      if (result.code === 0 && result.result?.token) {
        const { token, role, name, email } = result.result;

        // Kiểm tra kỹ name & email có tồn tại không
        if (!name || !email) {
          console.error("❌ Thiếu name hoặc email trong kết quả trả về.");
          alert("Login thành công nhưng thiếu thông tin người dùng.");
          return;
        }

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);

        console.log("✅ Lưu localStorage:", { token, role, name, email });

        // Điều hướng theo role
        switch (role) {
          case "ADMIN":
            window.location.href = "/adminpage";
            break;
          case "CUSTOMER":
            window.location.href = "/customerpage";
            break;
          case "USER":
          default:
            window.location.href = "/";
            break;
        }
      } else {
        console.warn("⚠️ Login thất bại: Sai thông tin đăng nhập");
        setFormErrors({ submit: "Invalid username or password." });
      }
    } catch (error) {
      console.error("❌ Lỗi khi login:", error);
      setFormErrors({ submit: "System error. Please try again later." });
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
            />
            {formErrors.username && <p className="error-text">{formErrors.username}</p>}
          </div>

          <div className="form-floating">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {formErrors.password && <p className="error-text">{formErrors.password}</p>}
          </div>

          <div className="form-check">
            <input type="checkbox" id="rememberMeSwitch" name="remember_me" />
            <label htmlFor="rememberMeSwitch">Remember me</label>
          </div>

          {formErrors.submit && (
            <p className="error-text submit-error">{formErrors.submit}</p>
          )}

          <button type="submit" className="btn">Sign in</button>
        </form>

        <p className="copyright">&copy; 2025 by VIVUGO</p>
      </main>
    </div>
  );
};

export default LoginPage;
