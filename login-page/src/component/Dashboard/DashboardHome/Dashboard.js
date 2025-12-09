import React from 'react';
import './Dashboard.css';
import './sidebar.css';
import './header.css';
import './AccountReview.css';
import './BalanceCard.css';
import './IncomeLimits.css';
import './RevenueAccount.css';
import './WithdrawalLimit.css';
import { 
  FaHome, FaCreditCard, FaMoneyBillWave, FaFileInvoiceDollar, 
  FaUsers, FaShieldAlt, FaCog, FaBell, FaSearch, 
  FaUserCircle, FaArrowUp, FaArrowDown, FaExchangeAlt, 
  FaPaperPlane, FaChartLine 
} from 'react-icons/fa';

function Dashboard() {
  // Sidebar menu items
  const menuItems = [
    { icon: <FaHome />, text: 'Dashboard', active: true },
    { icon: <FaCreditCard />, text: 'Transactions' },
    { icon: <FaCreditCard />, text: 'Cards' },
    { icon: <FaMoneyBillWave />, text: 'Sales' },
    { icon: <FaFileInvoiceDollar />, text: 'Deposits' },
    { icon: <FaFileInvoiceDollar />, text: 'Bills' },
    { icon: <FaUsers />, text: 'User Roles' },
    { icon: <FaShieldAlt />, text: 'Approvals' },
    { icon: <FaCog />, text: 'Settings' }
  ];

  // Account items
  const accountItems = [
    { name: 'Transactions', icon: <FaExchangeAlt /> },
    { name: 'Cards', icon: <FaCreditCard /> },
    { name: 'Sales', icon: <FaChartLine /> },
    { name: 'Deposits', icon: <FaMoneyBillWave /> },
    { name: 'Bills', icon: <FaFileInvoiceDollar /> },
    { name: 'User Roles', icon: <FaUsers /> },
    { name: 'Approvals', icon: <FaShieldAlt /> }
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <h1>Business<span>Dash</span></h1>
        </div>
        
        <ul className="nav-menu">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a href="#" className={item.active ? 'active' : ''}>
                {item.icon}
                <span>{item.text}</span>
              </a>
            </li>
          ))}
        </ul>
        
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <img src="https://ui-avatars.com/api/?name=Business+User&background=4a9eff&color=fff" alt="User" />
            </div>
            <div className="user-details">
              <h4>Business User</h4>
              <p>Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="header-left">
            <h2>Accounts</h2>
            <p>View details and statements and initiate fund transfers for all financial accounts</p>
          </div>
          
          <div className="header-right">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="Search accounts, transactions..." />
            </div>
            
            <div className="header-actions">
              <button className="notification-btn">
                <FaBell />
                <span className="notification-badge">3</span>
              </button>
              
              <div className="user-profile">
                <FaUserCircle className="profile-icon" />
                <span>Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Top Section */}
          <div className="top-section">
            {/* Account Overview */}
            <div className="account-overview">
              <div className="section-header">
                <h3>Accounts</h3>
                <a href="#" className="view-all">View All →</a>
              </div>
              
              <div className="account-grid">
                {accountItems.map((item, index) => (
                  <div className="account-item" key={index}>
                    <div className="account-icon">{item.icon}</div>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Balance Cards */}
            <div className="balance-cards">
              <div className="balance-card total-balance">
                <div className="card-header">
                  <h4>Total Balance</h4>
                  <div className="card-icon">
                    <FaChartLine />
                  </div>
                </div>
                <div className="card-amount">Rs. 1,460,750</div>
                <div className="card-trend">
                  <span className="trend-up">+2.5%</span> from last month
                </div>
              </div>
              
              <div className="balance-card income">
                <div className="card-header">
                  <h4>Total Incoming (Monthly)</h4>
                  <div className="card-icon">
                    <FaArrowDown />
                  </div>
                </div>
                <div className="card-amount">Rs. 680,000</div>
                <div className="card-trend">
                  <span className="trend-up">+15%</span> from last month
                </div>
              </div>
              
              <div className="balance-card outgoing">
                <div className="card-header">
                  <h4>Total Outgoing (Monthly)</h4>
                  <div className="card-icon">
                    <FaArrowUp />
                  </div>
                </div>
                <div className="card-amount">Rs. 66,260</div>
                <div className="card-trend">
                  <span className="trend-down">-5%</span> from last month
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section */}
          <div className="middle-section">
            {/* Income Limit */}
            <div className="income-limit">
              <div className="section-header">
                <h3>Income Limit</h3>
                <div className="limit-remaining">
                  Remaining: <span>Rs. 1,320,000</span>
                </div>
              </div>
              
              <div className="progress-container">
                <div className="progress-info">
                  <span>Rs. 680,000</span>
                  <span>Rs. 2,000,000</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '34%' }}></div>
                </div>
                <div className="progress-label">
                  <span>34% used</span>
                </div>
              </div>
              
              <div className="limit-actions">
                <button className="btn-secondary">Increase Limit</button>
                <button className="btn-primary">View Details</button>
              </div>
            </div>

            {/* Revenue Account */}
            <div className="revenue-account">
              <div className="section-header">
                <h3>Revenue Account</h3>
                <div className="revenue-amount">
                  <span className="amount">Rs. 1,030,000</span>
                </div>
              </div>
              
              <div className="money-actions">
                <button className="money-action-btn move-money">
                  <FaExchangeAlt />
                  <span>Move Money</span>
                </button>
                <button className="money-action-btn send-money">
                  <FaPaperPlane />
                  <span>Send Money</span>
                </button>
              </div>
              
              <div className="transfer-details">
                <h4>Local Transfer Details</h4>
                <div className="transfer-form">
                  <div className="form-group">
                    <label>From Account</label>
                    <select>
                      <option>Business Account (••• 4567)</option>
                      <option>Savings Account (••• 8910)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>To Account</label>
                    <input type="text" placeholder="Enter account number" />
                  </div>
                  <div className="form-group">
                    <label>Amount</label>
                    <input type="text" placeholder="Rs. 0.00" />
                  </div>
                  <button className="btn-primary transfer-btn">Initiate Transfer</button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="withdrawal-limit">
            <div className="section-header">
              <h3>Withdrawal Limit</h3>
              <div className="limit-remaining">
                Remaining: <span>Rs. 1,933,740</span>
              </div>
            </div>
            
            <div className="progress-container">
              <div className="progress-info">
                <span>Rs. 66,260</span>
                <span>Rs. 2,000,000</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '3.3%' }}></div>
              </div>
              <div className="progress-label">
                <span>3.3% used</span>
              </div>
            </div>
            
            <div className="recent-withdrawals">
              <h4>Recent Withdrawals</h4>
              <div className="withdrawals-list">
                <div className="withdrawal-item">
                  <div className="withdrawal-info">
                    <span className="withdrawal-name">Supplier Payment</span>
                    <span className="withdrawal-date">Today, 10:30 AM</span>
                  </div>
                  <span className="withdrawal-amount">Rs. 25,000</span>
                </div>
                <div className="withdrawal-item">
                  <div className="withdrawal-info">
                    <span className="withdrawal-name">Salary Transfer</span>
                    <span className="withdrawal-date">Yesterday, 2:15 PM</span>
                  </div>
                  <span className="withdrawal-amount">Rs. 41,260</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;