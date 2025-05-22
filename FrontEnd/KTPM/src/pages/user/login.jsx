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

    const errors = {};
    if (!formData.username.trim()) errors.username = "Username is required";
    if (!formData.password) errors.password = "Password is required";

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

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
        localStorage.setItem("token", rtokenn);
        window.location.href = "/";
      } else {
        setFormErrors({ submit: "Invalid username or password." });
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
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
