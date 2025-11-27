import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { authenticateUser } from "../../api/mockUser";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = authenticateUser(formData.email, formData.password);

    if (result.success) {
      login(result.user);
      localStorage.setItem("accessToken", result.token);
      navigate("/mypage");
    } else {
      setError(result.message);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} login`);
  };

  return (
    <div className="common-form">
      <div className="form-header">

        {/* ⭐ 홈페이지로 돌아가기 버튼 추가 */}
        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

        <h1 className="form-title">Login</h1>
        <p className="form-subtitle">로그인하세요</p>
      </div>

      <form className="form-content" onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}

        {/* Email */}
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="user@test.com"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label className="form-label">Password</label>
          <div className="password-input-wrapper">
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="1234"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button type="button" className="password-toggle">👁️</button>
          </div>
        </div>

        {/* Remember */}
        <div className="form-options">
          <label className="checkbox-wrapper">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
            />
            <span className="checkbox-label">비밀번호 기억하기</span>
          </label>
          <a href="#" className="forgot-password">Forgot Password?</a>
        </div>

        {/* Login Button */}
        <button type="submit" className="btn btn--primary btn--block">
          Login
        </button>

        {/* Divider */}
        <div className="divider">
          <span className="divider-text">회원가입 선택</span>
        </div>

        {/* Signup Buttons */}
        <div className="signup-dual-buttons">
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="btn btn--accent"
          >
            일반 회원가입
          </button>

          <button
            type="button"
            onClick={() => navigate("/business-signup")}
            className="btn btn--outline"
          >
            비즈니스 회원가입
          </button>
        </div>

        {/* Social Login */}
        <div className="social-login">
          <p className="social-login-text">Or login with</p>
          <div className="social-buttons">
            <button type="button" className="btn--social facebook">
              <span className="social-icon">f</span>
            </button>
            <button type="button" className="btn--social google">
              <span className="social-icon">G</span>
            </button>
            <button type="button" className="btn--social apple">
              <span className="social-icon">🍎</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
