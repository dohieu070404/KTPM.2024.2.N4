import React, { useState } from "react";
import "./login.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!formData.username.trim()) errors.username = "Username is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.dob) errors.dob = "Date of birth is required";
    if (!formData.password) errors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!formData.agreedToTerms) {
      errors.agreedToTerms = "You must agree to the terms and conditions";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      const response = await fetch("http://localhost:8080/bookingtravel/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.username,
          password: formData.password,
          email: formData.email,
          dob: formData.dob,
          roles: ["USER"],
        }),
      });

      const result = await response.json();

      if (result.code === 1000) {
        window.location.href = "/login";
      } else {
        setFormErrors({ submit: result.message || "Registration failed" });
      }
    } catch (error) {
      console.error("API error:", error);
      setFormErrors({ submit: "Server error, please try again later." });
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg"></div>

      <main className="form-signin">
        <h1 className="h3">Register</h1>

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
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && <p className="error-text">{formErrors.email}</p>}
          </div>

          <div className="form-floating">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            {formErrors.dob && <p className="error-text">{formErrors.dob}</p>}
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

          <div className="form-floating">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {formErrors.confirmPassword && (
              <p className="error-text">{formErrors.confirmPassword}</p>
            )}
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              id="agreedToTerms"
              checked={formData.agreedToTerms}
              onChange={handleChange}
            />
            <label htmlFor="agreedToTerms">
              I agree to the terms and conditions
            </label>
          </div>
          {formErrors.agreedToTerms && (
            <p className="error-text">{formErrors.agreedToTerms}</p>
          )}

          {formErrors.submit && (
            <p className="error-text submit-error">{formErrors.submit}</p>
          )}

          <button type="submit" className="btn">
            Register
          </button>
        </form>

        <p className="copyright">&copy; 2025 by VIVUGO</p>
      </main>
    </div>
  );
};

export default RegisterPage;
