import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const LoginPage = () => {
  const [user_name, set_user_name] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      const res = await fetch(
        "https://cors-anywhere.herokuapp.com/https://xivra.pk/auth/api/v1/auth/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            user_name: user_name,
            password: password,
          }),
        }
      );

      const data = await res.json();
      console.log(data);

      if (
        res.ok &&
        (data.success || data.status || data.MESSAGE === "Login successful")
      ) {
        // Success animation before redirect
        document.querySelector(".login-success").classList.add("active");

        setTimeout(() => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_name", data.user_name);
          navigate("/dashboard");
        }, 1500);
      } else {
        setErrorMsg(data.MESSAGE || "Invalid credentials");
        // Error shake animation
        document.querySelector(".form").classList.add("error-shake");
        setTimeout(() => {
          document.querySelector(".form").classList.remove("error-shake");
        }, 500);
      }
    } catch (error) {
      setErrorMsg("Error logging in: " + error.message);
      document.querySelector(".form").classList.add("error-shake");
      setTimeout(() => {
        document.querySelector(".form").classList.remove("error-shake");
      }, 500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    set_user_name("demo_user");
    setPassword("demo123");
  };

  return (
    <div className="login-container">
      {/* Background Animation */}
      <div className="background-animation">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="circle circle-4"></div>
      </div>

      {/* Floating Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Success Animation Overlay */}
      <div className="login-success">
        <div className="success-icon">✓</div>
        <div className="success-text">Login Successful!</div>
        <div className="success-subtext">Redirecting to dashboard...</div>
      </div>

      {/* Main Login Card */}
      <div className="login-card">
        {/* Left Side - Branding */}
        <div className="login-brand">
          <div className="brand-logo">
            <div className="logo-shape">
              <svg viewBox="0 0 100 100" fill="none">
                <path
                  d="M50 0L0 50L50 100L100 50L50 0Z"
                  fill="url(#gradient)"
                />
                <path
                  d="M70 40L50 60L30 40"
                  stroke="white"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="logo-pulse"></div>
          </div>

          <div className="brand-content">
            <h1 className="brand-title">Welcome Back</h1>
            <p className="brand-subtitle">
              Sign in to access your personalized dashboard and continue your
              journey with us.
            </p>

            <div className="features-list">
              <div className="feature">
                <span className="feature-icon">📊</span>
                <span>Advanced Analytics</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🔒</span>
                <span>Secure & Encrypted</span>
              </div>
              <div className="feature">
                <span className="feature-icon">⚡</span>
                <span>Lightning Fast</span>
              </div>
            </div>
          </div>

          <div className="brand-footer">
            <p>Don't have an account?</p>
            <button
              onClick={() => navigate("/CreateUser")}
              className="register-link"
              style={{
                background: "none",
                border: "none",
                color: "#6366f1",
                cursor: "pointer",
                fontSize: "inherit",
                padding: 0,
                textDecoration: "underline",
              }}
            >
              Create Account <span className="arrow">→</span>
            </button>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-wrapper">
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-header">
              <h2>Login to DevHub Pro</h2>
              <p className="form-subtitle">
                Enter your credentials to continue
              </p>
            </div>

            {errorMsg && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="input-group">
              <label htmlFor="username" className="input-label">
                Username or Email
              </label>
              <div className="input-wrapper">
                <span className="input-icon"></span>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username or email"
                  value={user_name}
                  onChange={(e) => set_user_name(e.target.value)}
                  required
                  className="form-input"
                  autoComplete="username"
                />
                {user_name && (
                  <button
                    type="button"
                    className="input-clear"
                    onClick={() => set_user_name("")}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <div className="input-wrapper">
                <span className="input-icon"></span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input"
                  autoComplete="current-password"
                />
                <div className="password-actions">
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                  {password && (
                    <button
                      type="button"
                      className="input-clear"
                      onClick={() => setPassword("")}
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" className="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <div className="button-loading">
                  <div className="spinner"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                <>
                  <span>Sign In</span>
                  <span className="button-icon">→</span>
                </>
              )}
            </button>

            <div className="divider">
              <span>or continue with</span>
            </div>

            <div className="social-login">
              <button type="button" className="social-btn google">
                <span className="social-icon">🔍</span>
                Google
              </button>
              <button type="button" className="social-btn github">
                <span className="social-icon">🐙</span>
                GitHub
              </button>
            </div>

            <div className="demo-section">
              <p>Want to try without account?</p>
              <button
                type="button"
                className="demo-button"
                onClick={handleDemoLogin}
              >
                Use Demo Credentials
              </button>
            </div>
          </form>

          <div className="form-footer">
            <p>By signing in, you agree to our</p>
            <div className="footer-links">
              <Link to="/terms">Terms of Service</Link>
              <span>•</span>
              <Link to="/privacy">Privacy Policy</Link>
              <span>•</span>
              <Link to="/cookies">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Notification */}
      <div className="notification-tip">
        <span className="tip-icon">💡</span>
        <span>Tip: Press Enter to submit the form quickly</span>
      </div>
    </div>
  );
};

export default LoginPage;
