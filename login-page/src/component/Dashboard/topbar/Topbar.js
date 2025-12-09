import React, { useEffect, useRef, useState } from "react";
import "../topbar/Topbar.css";

const Topbar = () => {
  // States
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navbarRef = useRef(null);
  const searchRef = useRef(null);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  // Mock Data
  const user = {
    name: "Sajjad",
    email: "sajjad@markhorict.com",
    avatar: "https://i.ibb.co/2kR3K6h/avatar.png",
    role: "Administrator",
  };

  const notifications = [  // Changed variable name from 'notification' to 'notifications'
    {
      id: 1,
      text: 'Project "Nova" is now live!',
      time: "10 min ago",
      read: false,
      icon: "🚀",
    },
    {
      id: 2,
      text: "Sarah commented on your design",
      time: "1 hour ago",
      read: true,
      icon: "💬",
    },
    {
      id: 3,
      text: "Your subscription renews in 7 days",
      time: "2 hours ago",
      read: false,
      icon: "💰",
    },
    {
      id: 4,
      text: "New feature: Dark Mode available",
      time: "1 day ago",
      read: true,
      icon: "🌙",
    },
  ];

  // Effects
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Fixed: Moved event listener outside handler

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Handlers
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  const markAllAsRead = () => {
    console.log("All notifications marked as read");
    setNotificationsOpen(false);
  };

  const handleLogout = () => {
    console.log("User logged out");
    setProfileMenuOpen(false);
  };

  const menuItems = [
    { icon: "👤", label: "Profile", action: () => alert("Profile clicked") },
    { icon: "⚙️", label: "Settings", action: () => alert("Settings clicked") },
    { icon: "💳", label: "Billing", action: () => alert("Billing clicked") },
    { icon: "🌐", label: "Language", action: () => alert("Language clicked") },
    { icon: "🆘", label: "Help Center", action: () => alert("Help clicked") },
    { icon: "🚪", label: "Logout", action: handleLogout, danger: true },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <nav
      ref={navbarRef}
      className={`navbar ${isScrolled ? "scrolled" : ""} ${
        isDarkMode ? "dark" : "light"
      }`}
      aria-label="Main navigation"
    >
      <div className="navbar-container">
        {/* Logo & Brand */}
        <div className="navbar-brand">
          <a href="/" className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 32 32" fill="none">
                <path
                  d="M16 2L2 16l14 14 14-14L16 2z"
                  fill="currentColor"
                  className="logo-shape"
                />
                <path
                  d="M22 12l-6 6-6-6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="brand-text">
              <h1 className="product-name">DevHub</h1>
              <span className="product-tag">Pro</span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          {/* Search Bar */}
          <div className="search-wrapper" ref={searchRef}>
            <button
              className={`search-toggle ${searchOpen ? "active" : ""}`}
              onClick={() => setSearchOpen(!searchOpen)}  // Fixed: onClick not onclick
              aria-label="Search"  // Fixed: aria-label not area-label
            >
              <svg className="search-icon" viewBox="0 0 24 24">
                <path
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div className={`search-box ${searchOpen ? "open" : ""}`}>
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search project, user, docs"
                  autoFocus
                />
                <button type="submit" className="search-submit">
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </form>
              <div className="search-suggestions">
                <span>Popular:</span>
                <button onClick={() => setSearchQuery("React Component")}>
                  React Component
                </button>
                <button onClick={() => setSearchQuery("API Documentation")}>
                  API Docs
                </button>
                <button onClick={() => setSearchQuery("User Dashboard")}>
                  Dashboard
                </button>
              </div>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="theme-toggle-wrapper">
            <button
              className={`theme-toggle ${isDarkMode ? "dark" : "light"}`}  // Fixed: "Dark" to "dark"
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
              title={`${
                isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
              }`}
            >
              <div className="toggle-circle">{isDarkMode ? "🌙" : "☀️"}</div>
              <span className="theme-label">
                {isDarkMode ? "Dark" : "Light"}
              </span>
            </button>
          </div>

          {/* Notifications */}
          <div className="notifications-wrapper" ref={notificationsRef}>  {/* Fixed: notifications-wrapper */}
            <button
              className={`notifications-btn ${
                notificationsOpen ? "active" : ""
              }`}
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              aria-label={`Notifications ${
                unreadCount > 0 ? `(${unreadCount} unread)` : ""
              }`}
            >
              <svg className="bell-icon" viewBox="0 0 24 24">
                <path
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              {unreadCount > 0 && (
                <span className="notification-badge">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>
            <div
              className={`notifications-dropdown ${
                notificationsOpen ? "show" : ""
              }`}
            >
              <div className="dropdown-header">  {/* Fixed: dropdown-header */}
                <h3>Notifications</h3>
                {unreadCount > 0 && (
                  <button onClick={markAllAsRead} className="mark-all-btn">
                    Mark all Read
                  </button>
                )}
              </div>
              <div className="notifications-list">
                {notifications.map((notification) => (  // Fixed: notifications not notificationsOpen
                  <div
                    key={notification.id}
                    className={`notification-item ${
                      !notification.read ? "unread" : ""
                    }`}
                    onClick={() =>
                      console.log("Notification Clicked", notification.id)
                    }
                  >
                    <span className="notification-icon">
                      {notification.icon}
                    </span>
                    <div className="notification-content">
                      <p className="notification-text">{notification.text}</p>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                    {!notification.read && <div className="unread-dot"></div>}
                  </div>
                ))}
              </div>
              <a href="/notifications" className="view-all-link">
                View All Notifications →
              </a>
            </div>
          </div>

          {/* Profile Menu */}
          <div className="profile-wrapper" ref={profileRef}>
            <button
              className={`profile-btn ${profileMenuOpen ? "active" : ""}`}
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              aria-label="User menu"
            >
              <img src={user.avatar} alt={user.name} className="user-avatar" />
              <span className="user-name">{user.name}</span>
              <svg
                className={`dropdown-arrow ${profileMenuOpen ? "open" : ""}`}
                viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            <div
              className={`profile-dropdown ${profileMenuOpen ? "show" : ""}`}
            >
              <div className="profile-header">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="dropdown-avatar"
                />
                <div className="user-info">
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                  <span className="user-role">{user.role}</span>
                </div>
              </div>
              <div className="menu-items">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    className={`menu-item ${item.danger ? "danger" : ""}`}
                    onClick={() => {
                      item.action();
                      setProfileMenuOpen(false);
                    }}
                  >
                    <span className="menu-icon">{item.icon}</span>
                    <span className="menu-label">{item.label}</span>
                  </button>
                ))}
              </div>
              <div className="profile-footer">
                <div className="theme-toggle-mobile">
                  <span>Theme:</span>
                  <button onClick={() => setIsDarkMode(!isDarkMode)}>
                    {isDarkMode ? "🌙 Dark" : "☀️ Light"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`mobile-menu-btn ${mobileMenuOpen ? "open" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}  // Added onClick handler
          aria-label="Toggle menu"
        >
          <span className="menu-line"></span>
          <span className="menu-line"></span>
          <span className="menu-line"></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-overlay ${mobileMenuOpen ? "show" : ""}`}>
        <div className="mobile-content">
          {/* Mobile Search */}
          <div className="mobile-search">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={searchQuery}  // Fixed: searchQuery not searchOpen
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
              />
              <button type="submit">🔍</button>
            </form>
          </div>

          {/* Mobile Notifications */}
          <div className="mobile-section">
            <h4>Notifications ({unreadCount})</h4>
            <div className="mobile-notifications">
              {notifications.slice(0, 3).map((notification) => (
                <div key={notification.id} className="mobile-notification">
                  <span className="mobile-notification-icon">
                    {notification.icon}
                  </span>
                  <div>
                    <p>{notification.text}</p>
                    <small>{notification.time}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Profile Menu */}
          <div className="mobile-section">
            <div className="mobile-profile-header">
              <img
                src={user.avatar}
                alt={user.name}
                className="mobile-avatar"
              />
              <div>
                <h4>{user.name}</h4>
                <p>{user.email}</p>
              </div>
            </div>
            <div className="mobile-menu-items">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className={`mobile-menu-item ${item.danger ? "danger" : ""}`}
                  onClick={() => {
                    item.action();
                    setMobileMenuOpen(false);
                  }}
                >
                  <span className="mobile-menu-icon">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Theme Toggle */}
          <div className="mobile-theme-section">
            <button
              className="mobile-theme-btn"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              <span className="theme-icon">{isDarkMode ? "🌙" : "☀️"}</span>
              Switch to {isDarkMode ? "Light" : "Dark"} Mode
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;