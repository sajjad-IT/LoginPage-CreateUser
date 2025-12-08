import React from "react";

import { FaHome, FaUser, FaBell, FaChartBar, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">Dashboard</h2>

      <ul className="menu">
        <li><FaHome /> Dashboard</li>
        <li><FaChartBar /> Reports</li>
        <li><FaUser /> Users</li>
        <li><FaBell /> Alerts</li>
        <li><FaSignOutAlt /> Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
