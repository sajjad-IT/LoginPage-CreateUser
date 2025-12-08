import React from "react";

import { FaUserCircle } from "react-icons/fa";

const Topbar = () => {
  return (
    <div className="topbar">
      <h2>Dashboard</h2>

      <div className="profile">
        <FaUserCircle size={32} />
      </div>
    </div>
  );
};

export default Topbar;
