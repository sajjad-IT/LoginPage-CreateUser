import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, 
  LineChart, Line, AreaChart, Area, ResponsiveContainer, CartesianGrid
} from "recharts";
import Topbar from "../topbar/Topbar";

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState("week");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [stats, setStats] = useState({
    leads: 1246,
    deals: 128,
    conversion: 26,
    revenue: 86400
  });

  // Mock data with realistic CRM metrics
  const leadsByDay = [
    { day: "Mon", leads: 180, calls: 45, meetings: 12 },
    { day: "Tue", leads: 220, calls: 52, meetings: 18 },
    { day: "Wed", leads: 190, calls: 48, meetings: 14 },
    { day: "Thu", leads: 240, calls: 58, meetings: 22 },
    { day: "Fri", leads: 210, calls: 50, meetings: 16 },
    { day: "Sat", leads: 160, calls: 35, meetings: 8 },
    { day: "Sun", leads: 120, calls: 28, meetings: 5 }
  ];

  const pipelineData = [
    { stage: "Prospect", value: 45, color: "#6366f1" },
    { stage: "Qualified", value: 32, color: "#8b5cf6" },
    { stage: "Proposal", value: 28, color: "#10b981" },
    { stage: "Negotiation", value: 18, color: "#f59e0b" },
    { stage: "Closed Won", value: 15, color: "#ef4444" }
  ];

  const marketingChannels = [
    { name: "Organic Search", value: 32.5, fill: "#6366f1" },
    { name: "Paid Ads", value: 24.8, fill: "#8b5cf6" },
    { name: "Social Media", value: 18.2, fill: "#10b981" },
    { name: "Email", value: 14.7, fill: "#f59e0b" },
    { name: "Referral", value: 9.8, fill: "#ef4444" }
  ];

  const recentLeads = [
    { id: 1, name: "Sarah Johnson", company: "TechCorp Inc.", source: "LinkedIn", status: "Hot", value: "$25k", lastContact: "2 hours ago" },
    { id: 2, name: "Michael Chen", company: "FinancePro", source: "Referral", status: "Warm", value: "$18k", lastContact: "Yesterday" },
    { id: 3, name: "Emma Rodriguez", company: "HealthPlus", source: "Website", status: "New", value: "$42k", lastContact: "5 hours ago" },
    { id: 4, name: "David Wilson", company: "Retail Giant", source: "Email", status: "Cold", value: "$31k", lastContact: "3 days ago" },
    { id: 5, name: "Lisa Parker", company: "EduTech", source: "Conference", status: "Hot", value: "$56k", lastContact: "1 hour ago" }
  ];

  const topAgents = [
    { name: "Alex Morgan", deals: 24, conversion: 38, revenue: "$245k", avatar: "👨‍💼" },
    { name: "Samantha Lee", deals: 21, conversion: 42, revenue: "$198k", avatar: "👩‍💼" },
    { name: "James Wilson", deals: 18, conversion: 35, revenue: "$167k", avatar: "🧑‍💼" },
    { name: "Maria Garcia", deals: 16, conversion: 41, revenue: "$154k", avatar: "👩‍💻" }
  ];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        leads: prev.leads + Math.floor(Math.random() * 3),
        deals: prev.deals + Math.floor(Math.random() * 2)
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="crm-dashboard">
      <Topbar onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      {/* Animated Background Elements */}
      <div className="dashboard-bg">
        <div className="bg-grid"></div>
        <div className="bg-glow"></div>
        <div className="floating-shapes">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="floating-shape" style={{
              animationDelay: `${i * 0.5}s`,
              left: `${20 + (i * 10)}%`
            }}></div>
          ))}
        </div>
      </div>

      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-header">
            <div className="logo-container">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
                        stroke="currentColor" strokeWidth="2"/>
                  <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <span className="logo-text">Sales<span className="logo-highlight">Hub</span></span>
            </div>
            <button 
              className="collapse-btn"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? '→' : '←'}
            </button>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-section">
              <div className="nav-label">MAIN</div>
              <a href="#dashboard" className="nav-item active">
                <span className="nav-icon">📊</span>
                {!sidebarCollapsed && <span className="nav-text">Dashboard</span>}
                <span className="nav-badge">3</span>
              </a>
              <a href="#analytics" className="nav-item">
                <span className="nav-icon">📈</span>
                {!sidebarCollapsed && <span className="nav-text">Analytics</span>}
              </a>
              <a href="#pipeline" className="nav-item">
                <span className="nav-icon">🎯</span>
                {!sidebarCollapsed && <span className="nav-text">Pipeline</span>}
                <span className="nav-badge">12</span>
              </a>
              <a href="#leads" className="nav-item">
                <span className="nav-icon">👥</span>
                {!sidebarCollapsed && <span className="nav-text">Leads</span>}
                <span className="nav-badge">47</span>
              </a>
            </div>

            <div className="nav-section">
              <div className="nav-label">ACTIVITIES</div>
              <a href="#tasks" className="nav-item">
                <span className="nav-icon">✅</span>
                {!sidebarCollapsed && <span className="nav-text">Tasks</span>}
              </a>
              <a href="#calendar" className="nav-item">
                <span className="nav-icon">📅</span>
                {!sidebarCollapsed && <span className="nav-text">Calendar</span>}
              </a>
              <a href="#messages" className="nav-item">
                <span className="nav-icon">✉️</span>
                {!sidebarCollapsed && <span className="nav-text">Messages</span>}
                <span className="nav-badge">8</span>
              </a>
            </div>

            <div className="nav-section">
              <div className="nav-label">TOOLS</div>
              <a href="#reports" className="nav-item">
                <span className="nav-icon">📋</span>
                {!sidebarCollapsed && <span className="nav-text">Reports</span>}
              </a>
              <a href="#automation" className="nav-item">
                <span className="nav-icon">⚡</span>
                {!sidebarCollapsed && <span className="nav-text">Automation</span>}
              </a>
              <a href="#integrations" className="nav-item">
                <span className="nav-icon">🔗</span>
                {!sidebarCollapsed && <span className="nav-text">Integrations</span>}
              </a>
            </div>

            <div className="nav-section">
              <div className="nav-label">SETTINGS</div>
              <a href="#team" className="nav-item">
                <span className="nav-icon">👨‍👩‍👧‍👦</span>
                {!sidebarCollapsed && <span className="nav-text">Team</span>}
              </a>
              <a href="#settings" className="nav-item">
                <span className="nav-icon">⚙️</span>
                {!sidebarCollapsed && <span className="nav-text">Settings</span>}
              </a>
            </div>
          </nav>

          <div className="sidebar-footer">
            <div className="user-card">
              <div className="user-avatar">👤</div>
              {!sidebarCollapsed && (
                <div className="user-info">
                  <div className="user-name">Admin User</div>
                  <div className="user-role">Administrator</div>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          {/* Dashboard Header */}
          <header className="dashboard-header">
            <div className="header-left">
              <h1 className="dashboard-title"></h1>
              <p className="dashboard-subtitle">Welcome back! Here's what's happening with your sales today.</p>
            </div>
            
            <div className="header-right">
              <div className="date-filter">
                <button 
                  className={`filter-btn ${activeFilter === 'day' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('day')}
                >
                  Today
                </button>
                <button 
                  className={`filter-btn ${activeFilter === 'week' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('week')}
                >
                  This Week
                </button>
                <button 
                  className={`filter-btn ${activeFilter === 'month' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('month')}
                >
                  This Month
                </button>
              </div>
              
              <button className="action-btn primary">
                <span className="btn-icon">+</span>
                New Lead
              </button>
              <button className="action-btn secondary">
                <span className="btn-icon">📊</span>
                Generate Report
              </button>
            </div>
          </header>

          {/* Key Metrics Cards */}
          <section className="metrics-grid">
            <div className="metric-card">
              <div className="metric-header">
                <h3 className="metric-title">Total Leads</h3>
                <span className="metric-trend up">+14%</span>
              </div>
              <div className="metric-content">
                <h1 className="metric-value">{stats.leads.toLocaleString()}</h1>
                <div className="metric-chart">
                  <LineChart width={120} height={30} data={leadsByDay}>
                    <Line type="monotone" dataKey="leads" stroke="#6366f1" strokeWidth={2} dot={false} />
                  </LineChart>
                </div>
              </div>
              <div className="metric-footer">
                <span className="metric-label">vs last week</span>
                <span className="metric-change">↑ 152 leads</span>
              </div>
              <div className="metric-glow" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)' }}></div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <h3 className="metric-title">Active Deals</h3>
                <span className="metric-trend up">+8%</span>
              </div>
              <div className="metric-content">
                <h1 className="metric-value">{stats.deals}</h1>
                <div className="metric-chart">
                  <LineChart width={120} height={30} data={leadsByDay}>
                    <Line type="monotone" dataKey="meetings" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                  </LineChart>
                </div>
              </div>
              <div className="metric-footer">
                <span className="metric-label">Pipeline Value</span>
                <span className="metric-change">$512k</span>
              </div>
              <div className="metric-glow" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)' }}></div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <h3 className="metric-title">Conversion Rate</h3>
                <span className="metric-trend down">-4%</span>
              </div>
              <div className="metric-content">
                <h1 className="metric-value">{stats.conversion}%</h1>
                <div className="progress-ring">
                  <svg width="60" height="60">
                    <circle cx="30" cy="30" r="25" stroke="#e2e8f0" strokeWidth="4" fill="none" />
                    <circle cx="30" cy="30" r="25" stroke="#10b981" strokeWidth="4" fill="none" 
                            strokeDasharray={`${stats.conversion * 1.57} 157`} strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="metric-footer">
                <span className="metric-label">Target 30%</span>
                <span className="metric-change">Need 4% more</span>
              </div>
              <div className="metric-glow" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)' }}></div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <h3 className="metric-title">Monthly Revenue</h3>
                <span className="metric-trend up">+6%</span>
              </div>
              <div className="metric-content">
                <h1 className="metric-value">${stats.revenue.toLocaleString()}</h1>
                <div className="metric-chart">
                  <AreaChart width={120} height={30} data={leadsByDay}>
                    <Area type="monotone" dataKey="leads" stroke="#f59e0b" fill="rgba(245,158,11,0.1)" />
                  </AreaChart>
                </div>
              </div>
              <div className="metric-footer">
                <span className="metric-label">vs last month</span>
                <span className="metric-change">↑ $4.8k</span>
              </div>
              <div className="metric-glow" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)' }}></div>
            </div>
          </section>

          {/* Charts Section */}
          <section className="charts-grid">
            {/* Leads Overview */}
            <div className="chart-card">
              <div className="chart-header">
                <h3>Leads Overview</h3>
                <select className="chart-select">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last quarter</option>
                </select>
              </div>
              <div className="chart-content">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={leadsByDay}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="day" stroke="var(--text-secondary)" />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'var(--surface)', 
                        border: '1px solid var(--border)',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="leads" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="calls" fill="var(--secondary)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pipeline Stages */}
            <div className="chart-card">
              <div className="chart-header">
                <h3>Pipeline Stages</h3>
                <span className="chart-subtitle">Active deals by stage</span>
              </div>
              <div className="chart-content">
                <div className="pipeline-stages">
                  {pipelineData.map((stage, index) => (
                    <div key={stage.stage} className="pipeline-stage">
                      <div className="stage-header">
                        <span className="stage-name">{stage.stage}</span>
                        <span className="stage-value">{stage.value} deals</span>
                      </div>
                      <div className="stage-bar">
                        <div 
                          className="stage-progress" 
                          style={{ 
                            width: `${stage.value}%`,
                            background: stage.color
                          }}
                        ></div>
                      </div>
                      <div className="stage-percentage">{stage.value}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Marketing Channels */}
            <div className="chart-card">
              <div className="chart-header">
                <h3>Marketing Channels</h3>
                <span className="chart-subtitle">Lead sources distribution</span>
              </div>
              <div className="chart-content">
                <div className="marketing-channels">
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie
                        data={marketingChannels}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {marketingChannels.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="channel-legend">
                    {marketingChannels.map((channel, index) => (
                      <div key={channel.name} className="legend-item">
                        <span className="legend-color" style={{ background: channel.fill }}></span>
                        <span className="legend-label">{channel.name}</span>
                        <span className="legend-value">{channel.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Top Performing Agents */}
            <div className="chart-card">
              <div className="chart-header">
                <h3>Top Agents</h3>
                <button className="view-all-btn">View All →</button>
              </div>
              <div className="chart-content">
                <div className="agents-list">
                  {topAgents.map((agent, index) => (
                    <div key={agent.name} className="agent-card">
                      <div className="agent-rank">{index + 1}</div>
                      <div className="agent-avatar">{agent.avatar}</div>
                      <div className="agent-info">
                        <div className="agent-name">{agent.name}</div>
                        <div className="agent-stats">
                          <span className="agent-stat">
                            <span className="stat-label">Deals:</span>
                            <span className="stat-value">{agent.deals}</span>
                          </span>
                          <span className="agent-stat">
                            <span className="stat-label">Revenue:</span>
                            <span className="stat-value">{agent.revenue}</span>
                          </span>
                        </div>
                      </div>
                      <div className="agent-conversion">
                        <div className="conversion-value">{agent.conversion}%</div>
                        <div className="conversion-label">Conversion</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Section */}
          <section className="bottom-grid">
            {/* Recent Leads Table */}
            <div className="bottom-card wide">
              <div className="card-header">
                <h3>Recent Leads</h3>
                <div className="header-actions">
                  <button className="action-btn small">Export</button>
                  <button className="action-btn small primary">Add Lead</button>
                </div>
              </div>
              <div className="card-content">
                <div className="leads-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Source</th>
                        <th>Status</th>
                        <th>Value</th>
                        <th>Last Contact</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentLeads.map(lead => (
                        <tr key={lead.id}>
                          <td>
                            <div className="lead-name">
                              <div className="lead-avatar">
                                {lead.name.charAt(0)}
                              </div>
                              {lead.name}
                            </div>
                          </td>
                          <td>{lead.company}</td>
                          <td>
                            <span className={`source-tag source-${lead.source.toLowerCase()}`}>
                              {lead.source}
                            </span>
                          </td>
                          <td>
                            <span className={`status-badge status-${lead.status.toLowerCase()}`}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="lead-value">{lead.value}</td>
                          <td className="lead-time">{lead.lastContact}</td>
                          <td>
                            <div className="action-buttons">
                              <button className="action-icon" title="Call">📞</button>
                              <button className="action-icon" title="Email">✉️</button>
                              <button className="action-icon" title="Edit">✏️</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bottom-card">
              <div className="card-header">
                <h3>Activity Feed</h3>
              </div>
              <div className="card-content">
                <div className="activity-feed">
                  {[
                    { time: "2 min ago", action: "New lead added from LinkedIn", user: "Alex" },
                    { time: "15 min ago", action: "Deal marked as won: $25k", user: "Samantha" },
                    { time: "1 hour ago", action: "Meeting scheduled with TechCorp", user: "James" },
                    { time: "3 hours ago", action: "Email campaign sent to 500 leads", user: "System" },
                    { time: "5 hours ago", action: "Monthly report generated", user: "Maria" }
                  ].map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-time">{activity.time}</div>
                      <div className="activity-text">{activity.action}</div>
                      <div className="activity-user">by {activity.user}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;