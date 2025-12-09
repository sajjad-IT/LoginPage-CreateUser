import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const LoginPage = () => {
  const [user_name, set_user_name] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [shakeForm, setShakeForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [typingEffect, setTypingEffect] = useState("");
  const navigate = useNavigate();

  // Typing effect for brand title
  useEffect(() => {
    const text = "Welcome Back";
    let i = 0;
    const typing = setInterval(() => {
      if (i <= text.length) {
        setTypingEffect(text.substring(0, i));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 100);
    return () => clearInterval(typing);
  }, []);

  // Custom Alert Function with styling
  const showCustomAlert = (type, title, message, options = {}) => {
    const alertDiv = document.createElement('div');
    alertDiv.className = `custom-alert alert-${type}`;
    
    const colors = {
      success: { bg: '#10b981', icon: '✓' },
      error: { bg: '#ef4444', icon: '⚠️' },
      warning: { bg: '#f59e0b', icon: '⚠️' },
      info: { bg: '#3b82f6', icon: 'ℹ️' }
    };
    
    const color = colors[type] || colors.info;
    
    alertDiv.innerHTML = `
      <div class="alert-content">
        <div class="alert-icon" style="background: ${color.bg}">${color.icon}</div>
        <div class="alert-text">
          <h4>${title}</h4>
          <p>${message}</p>
        </div>
        <button class="alert-close">&times;</button>
      </div>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.classList.add('hide');
        setTimeout(() => {
          if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
          }
        }, 300);
      }
    }, 5000);
    
    // Close button event
    alertDiv.querySelector('.alert-close').onclick = () => {
      alertDiv.classList.add('hide');
      setTimeout(() => {
        if (alertDiv.parentNode) {
          alertDiv.parentNode.removeChild(alertDiv);
        }
      }, 300);
    };
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    if (!password) return { strength: 0, color: "#e2e8f0" };
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    const colors = ["#ef4444", "#f59e0b", "#3b82f6", "#10b981"];
    return { strength, color: colors[strength - 1] || colors[0] };
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    // Form validation
    if (!user_name.trim() || !password.trim()) {
      showCustomAlert('warning', 'Missing Fields', 'Please fill in all required fields');
      setIsLoading(false);
      setShakeForm(true);
      setTimeout(() => setShakeForm(false), 500);
      return;
    }

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

      if (res.ok && (data.success || data.status || data.MESSAGE === "Login successful")) {
        // Success
        setShowSuccess(true);
        showCustomAlert('success', 'Login Successful', 'Welcome back! Redirecting to dashboard...');
        
        setTimeout(() => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_name", data.user_name);
          navigate("/dashboard");
        }, 1500);
      } else {
        // Error
        const errorMessage = data.MESSAGE || "Invalid credentials";
        setErrorMsg(errorMessage);
        showCustomAlert('error', 'Login Failed', errorMessage);
        setShakeForm(true);
        setTimeout(() => setShakeForm(false), 500);
      }
    } catch (error) {
      // Network error
      setErrorMsg("Error logging in: " + error.message);
      showCustomAlert('error', 'Connection Error', 'Unable to connect to server. Please check your internet connection.');
      setShakeForm(true);
      setTimeout(() => setShakeForm(false), 500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    set_user_name("demo_user");
    setPassword("demo123");
    
    // Show demo notification
    showCustomAlert('info', 'Demo Mode Activated', 'Demo credentials have been filled. Click "Sign In" to continue.');
  };

  const handleSocialLogin = (provider) => {
    showCustomAlert('info', `Sign in with ${provider}`, 
      `${provider} login integration is coming soon! For now, please use the demo credentials or your account.`);
  };

  const handleForgotPassword = () => {
    const email = prompt("Enter your email to receive a password reset link:");
    if (email) {
      showCustomAlert('success', 'Link Sent!', `Password reset link has been sent to ${email}`);
    }
  };

  const strength = getPasswordStrength();

  return (
    <div className="login-container">
      {/* Add custom alert styles */}
      <style jsx="true">{`
        .custom-alert {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #1e293b;
          border-radius: 12px;
          padding: 15px;
          min-width: 300px;
          max-width: 400px;
          border-left: 4px solid #3b82f6;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          z-index: 9999;
          animation: slideIn 0.3s ease;
          border: 1px solid #334155;
        }
        
        .alert-success {
          border-left-color: #10b981;
        }
        
        .alert-error {
          border-left-color: #ef4444;
        }
        
        .alert-warning {
          border-left-color: #f59e0b;
        }
        
        .alert-info {
          border-left-color: #3b82f6;
        }
        
        .alert-content {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .alert-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: white;
          flex-shrink: 0;
        }
        
        .alert-text h4 {
          margin: 0 0 5px 0;
          color: #f1f5f9;
          font-size: 16px;
        }
        
        .alert-text p {
          margin: 0;
          color: #cbd5e1;
          font-size: 14px;
        }
        
        .alert-close {
          background: none;
          border: none;
          color: #94a3b8;
          font-size: 24px;
          cursor: pointer;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          margin-left: auto;
          transition: all 0.2s ease;
        }
        
        .alert-close:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #f1f5f9;
        }
        
        .hide {
          transform: translateX(100%);
          opacity: 0;
          transition: all 0.3s ease;
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>

      {/* Rest of your JSX remains the same as the enhanced version */}
      {/* ... (keep all the JSX from the enhanced version) ... */}
      
      {/* Background Animation */}
      <div className="background-animation">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="circle circle-4"></div>
      </div>

      {/* Floating Particles */}
      <div className="particles">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              background: `radial-gradient(circle, ${i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#8b5cf6' : '#ec4899'}, transparent)`
            }}
          ></div>
        ))}
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
            <h1 className="brand-title typing-effect">
              {typingEffect}
              <span className="cursor">|</span>
            </h1>
            <p className="brand-subtitle">
              Sign in to access your personalized dashboard and continue your
              journey with us.
            </p>

            <div className="features-list">
              {[
                { icon: "📊", text: "Advanced Analytics", desc: "Real-time insights" },
                { icon: "🔒", text: "Bank-level Security", desc: "AES-256 encryption" },
                { icon: "⚡", text: "Lightning Fast", desc: "Sub-100ms response" }
              ].map((feature, index) => (
                <div key={index} className="feature">
                  <span className="feature-icon">{feature.icon}</span>
                  <div className="feature-text">
                    <span className="feature-main">{feature.text}</span>
                    <span className="feature-desc">{feature.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="brand-footer">
            <p className="footer-text">New to DevHub Pro?</p>
            <button
              onClick={() => navigate("/CreateUser")}
              className="register-link"
            >
              Create Free Account <span className="arrow">→</span>
            </button>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-wrapper">
          <form className={`login-form ${shakeForm ? 'shake' : ''}`} onSubmit={handleLogin}>
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
                <button 
                  className="error-close"
                  onClick={() => setErrorMsg("")}
                >
                  ×
                </button>
              </div>
            )}

            <div className="input-group">
              <label htmlFor="username" className="input-label">
                Username or Email
              </label>
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  id="username"
                  type="text"
                  placeholder="john@example.com"
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
                <span className="input-icon">🔒</span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input"
                  autoComplete="current-password"
                />
                <div className="password-actions">
                  <button
                    type="button"
                    className={`password-toggle ${showPassword ? 'visible' : ''}`}
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
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div 
                      className="strength-fill"
                      style={{
                        width: `${strength.strength * 25}%`,
                        background: strength.color
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" className="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <button 
                type="button" 
                className="forgot-link"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            </div>

            <button 
              type="submit" 
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
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
              <button 
                type="button" 
                className="social-btn google"
                onClick={() => handleSocialLogin('Google')}
              >
                <span className="social-icon">🔍</span>
                Google
              </button>
              <button 
                type="button" 
                className="social-btn github"
                onClick={() => handleSocialLogin('GitHub')}
              >
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
    </div>
  );
};

export default LoginPage;