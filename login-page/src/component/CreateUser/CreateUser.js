import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateUser.css";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    first_name: "",
    last_name: "",
    email_address: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();

  // Password strength calculator
  useEffect(() => {
    let strength = 0;
    const { password } = formData;
    
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    
    setPasswordStrength(strength);
  }, [formData.password]);

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.user_name.trim()) {
      newErrors.user_name = "Username is required";
    } else if (formData.user_name.length < 3) {
      newErrors.user_name = "Username must be at least 3 characters";
    }

    if (!formData.email_address.trim()) {
      newErrors.email_address = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_address)) {
      newErrors.email_address = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Shake animation for errors
      document.querySelector('.register-form').classList.add('error-shake');
      setTimeout(() => {
        document.querySelector('.register-form').classList.remove('error-shake');
      }, 500);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(
        "https://cors-anywhere.herokuapp.com/https://xivra.pk/auth/api/v1/users/create_user.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            user_name: formData.user_name,
            email_address: formData.email_address,
            password: formData.password,
            first_name: formData.first_name,
            last_name: formData.last_name,
          }),
        }
      );

      const data = await res.json();
      console.log(data);

      if (res.ok && data.success) {
        // Success animation
        document.querySelector('.success-animation').classList.add('active');
        
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        alert(data.MESSAGE || "Registration failed");
        document.querySelector('.register-form').classList.add('error-shake');
        setTimeout(() => {
          document.querySelector('.register-form').classList.remove('error-shake');
        }, 500);
      }
    } catch (error) {
      alert("Error: " + error.message);
      document.querySelector('.register-form').classList.add('error-shake');
      setTimeout(() => {
        document.querySelector('.register-form').classList.remove('error-shake');
      }, 500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoFill = () => {
    setFormData({
      user_name: "john_doe",
      first_name: "John",
      last_name: "Doe",
      email_address: "john@example.com",
      password: "Demo@1234",
      confirmPassword: "Demo@1234"
    });
  };

  // Get password strength color
  const getStrengthColor = () => {
    if (passwordStrength < 50) return "#ef4444";
    if (passwordStrength < 75) return "#f59e0b";
    return "#10b981";
  };

  // Get strength label
  const getStrengthLabel = () => {
    if (passwordStrength < 25) return "Very Weak";
    if (passwordStrength < 50) return "Weak";
    if (passwordStrength < 75) return "Good";
    if (passwordStrength < 100) return "Strong";
    return "Very Strong";
  };

  return (
    <div className="register-container">
      {/* Background Animation */}
      <div className="background-animation">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="circle circle-4"></div>
      </div>

      {/* Floating Particles */}
      <div className="particles">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${4 + Math.random() * 4}s`
          }}></div>
        ))}
      </div>

      {/* Success Animation Overlay */}
      <div className="success-animation">
        <div className="success-icon">✓</div>
        <div className="success-text">Registration Successful!</div>
        <div className="success-subtext">Welcome to the platform</div>
      </div>

      {/* Main Registration Card */}
      <div className="register-card">
        {/* Left Side - Branding */}
        <div className="register-brand">
          <div className="brand-logo">
            <div className="logo-shape">
              <svg viewBox="0 0 100 100" fill="none">
                <path d="M50 0L0 50L50 100L100 50L50 0Z" 
                      fill="url(#gradient)" />
                <path d="M70 40L50 60L30 40" 
                      stroke="white" strokeWidth="8" strokeLinecap="round" />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="logo-pulse"></div>
          </div>
          
          <div className="brand-content">
            <h1 className="brand-title">Join Our Community</h1>
            <p className="brand-subtitle">
              Create your account and unlock access to powerful CRM tools and analytics.
            </p>
            
            <div className="benefits-list">
              <div className="benefit">
                <span className="benefit-icon">🚀</span>
                <div className="benefit-content">
                  <h4>Fast Onboarding</h4>
                  <p>Get started in minutes with our intuitive setup</p>
                </div>
              </div>
              <div className="benefit">
                <span className="benefit-icon">🔒</span>
                <div className="benefit-content">
                  <h4>Enterprise Security</h4>
                  <p>Your data is protected with bank-level encryption</p>
                </div>
              </div>
              <div className="benefit">
                <span className="benefit-icon">⚡</span>
                <div className="benefit-content">
                  <h4>24/7 Support</h4>
                  <p>Our team is always ready to help you succeed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="brand-footer">
            <p>Already have an account?</p>
            <Link to="/" className="login-link">
              Sign In <span className="arrow">→</span>
            </Link>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="register-form-wrapper">
          <form className="register-form" onSubmit={handleRegister}>
            <div className="form-header">
              <h2>Create Your Account</h2>
              <p className="form-subtitle">Fill in your details to get started</p>
            </div>

            <div className="form-row">
              <div className="input-group half">
                <label htmlFor="first_name" className="input-label">
                  First Name *
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    placeholder="Enter your first name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className={`form-input ${errors.first_name ? 'error' : ''}`}
                    autoComplete="given-name"
                  />
                  {errors.first_name && (
                    <span className="error-icon">⚠️</span>
                  )}
                </div>
                {errors.first_name && (
                  <span className="error-message">{errors.first_name}</span>
                )}
              </div>

              <div className="input-group half">
                <label htmlFor="last_name" className="input-label">
                  Last Name *
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    placeholder="Enter your last name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className={`form-input ${errors.last_name ? 'error' : ''}`}
                    autoComplete="family-name"
                  />
                  {errors.last_name && (
                    <span className="error-icon">⚠️</span>
                  )}
                </div>
                {errors.last_name && (
                  <span className="error-message">{errors.last_name}</span>
                )}
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="user_name" className="input-label">
                Username *
              </label>
              <div className="input-wrapper">
                <span className="input-icon">@</span>
                <input
                  id="user_name"
                  name="user_name"
                  type="text"
                  placeholder="Choose a username"
                  value={formData.user_name}
                  onChange={handleInputChange}
                  className={`form-input ${errors.user_name ? 'error' : ''}`}
                  autoComplete="username"
                />
                {errors.user_name && (
                  <span className="error-icon">⚠️</span>
                )}
              </div>
              {errors.user_name && (
                <span className="error-message">{errors.user_name}</span>
              )}
              <div className="input-hint">
                Must be at least 3 characters. Letters, numbers, and underscores only.
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="email_address" className="input-label">
                Email Address *
              </label>
              <div className="input-wrapper">
                <span className="input-icon">✉️</span>
                <input
                  id="email_address"
                  name="email_address"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email_address}
                  onChange={handleInputChange}
                  className={`form-input ${errors.email_address ? 'error' : ''}`}
                  autoComplete="email"
                />
                {errors.email_address && (
                  <span className="error-icon">⚠️</span>
                )}
              </div>
              {errors.email_address && (
                <span className="error-message">{errors.email_address}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="password" className="input-label">
                Password *
              </label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  autoComplete="new-password"
                />
                <div className="password-actions">
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div 
                      className="strength-fill"
                      style={{
                        width: `${passwordStrength}%`,
                        backgroundColor: getStrengthColor()
                      }}
                    ></div>
                  </div>
                  <div className="strength-info">
                    <span className="strength-label">Strength: </span>
                    <span className="strength-value" style={{ color: getStrengthColor() }}>
                      {getStrengthLabel()}
                    </span>
                  </div>
                </div>
              )}

              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
              
              <div className="password-requirements">
                <p className="requirements-title">Password must contain:</p>
                <ul className="requirements-list">
                  <li className={formData.password.length >= 8 ? 'valid' : ''}>
                    ✓ At least 8 characters
                  </li>
                  <li className={/[A-Z]/.test(formData.password) ? 'valid' : ''}>
                    ✓ One uppercase letter
                  </li>
                  <li className={/[0-9]/.test(formData.password) ? 'valid' : ''}>
                    ✓ One number
                  </li>
                  <li className={/[^A-Za-z0-9]/.test(formData.password) ? 'valid' : ''}>
                    ✓ One special character
                  </li>
                </ul>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword" className="input-label">
                Confirm Password *
              </label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  autoComplete="new-password"
                />
                <div className="password-actions">
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>

            <div className="form-options">
              <label className="terms-check">
                <input type="checkbox" className="checkbox" required />
                <span className="checkmark"></span>
                I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
              </label>
            </div>

            <button 
              type="submit" 
              className="register-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="button-loading">
                  <div className="spinner"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                <>
                  <span>Create Account</span>
                  <span className="button-icon">🚀</span>
                </>
              )}
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            <div className="demo-section">
              <button 
                type="button" 
                className="demo-button"
                onClick={handleDemoFill}
              >
                <span className="demo-icon">🎯</span>
                Fill Demo Data
              </button>
              
              <p className="demo-note">
                Use this to quickly test the registration form with pre-filled data.
              </p>
            </div>

            <div className="social-signup">
              <p className="social-title">Sign up with</p>
              <div className="social-buttons">
                <button type="button" className="social-btn google">
                  <span className="social-icon">🔍</span>
                  Google
                </button>
                <button type="button" className="social-btn github">
                  <span className="social-icon">🐙</span>
                  GitHub
                </button>
                <button type="button" className="social-btn linkedin">
                  <span className="social-icon">💼</span>
                  LinkedIn
                </button>
              </div>
            </div>
          </form>

          <div className="form-footer">
            <p>By creating an account, you agree to our</p>
            <div className="footer-links">
              <Link to="/terms">Terms</Link>
              <span>•</span>
              <Link to="/privacy">Privacy</Link>
              <span>•</span>
              <Link to="/cookies">Cookies</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Tip */}
      <div className="notification-tip">
        <span className="tip-icon">💡</span>
        <span>Pro tip: Use a password manager for strong, unique passwords</span>
      </div>
    </div>
  );
};

export default CreateUser;