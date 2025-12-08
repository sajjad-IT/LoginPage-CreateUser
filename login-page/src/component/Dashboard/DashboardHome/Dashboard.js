import React from "react";
import "./Dashboard.css";
import {
  BarChart, Bar, XAxis, Tooltip, PieChart, Pie, Cell, LineChart, Line
} from "recharts";

const Dashboard = () => {
  const reasons = [
    { day: "Sat", value: 30 },
    { day: "Sun", value: 22 },
    { day: "Mon", value: 28 },
    { day: "Tue", value: 35 },
    { day: "Wed", value: 20 },
    { day: "Thu", value: 26 }
  ];

  const patient = [
    { day: "Sat", value: 40 },
    { day: "Sun", value: 55 },
    { day: "Mon", value: 70 },
    { day: "Tue", value: 100 },
    { day: "Wed", value: 80 },
    { day: "Thu", value: 58 }
  ];

  const marketing = [
    { name: "Direct", value: 74.9 },
    { name: "Facebook", value: 58.8 },
    { name: "Organic", value: 73.7 },
    { name: "Instagram", value: 50.6 },
    { name: "Paid", value: 88.5 }
  ];

  const COLORS = ["#7CFF6A", "#FF8C6B", "#C98CFF", "#70D7FF", "#FFD36B"];

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">CRM</div>
        <div className="side-icon active" title="Dashboard">🏠</div>
        <div className="side-icon" title="Analytics">📊</div>
        <div className="side-icon" title="Pipeline">📈</div>
        <div className="side-icon" title="Messages">✉️</div>
        <div className="side-icon" title="Settings">⚙️</div>
      </aside>

      <main className="dashboard-main">
        {/* Topbar */}
        <header className="topbar glass">
          <div className="topbar-left">
            <input className="search" type="text" placeholder="Search leads, deals, agents..." />
          </div>
          <div className="top-right">
            <button className="round-btn">New Lead</button>
            <button className="yellow-btn">Generate Report</button>
            <img src="https://i.pravatar.cc/40" alt="user" className="user-img" />
          </div>
        </header>

        {/* KPI Cards row (4) */}
        <section className="cards-row">
          <div className="card neon-card glass">
            <h2>New Leads</h2>
            <h1>1,246</h1>
            <p className="muted">+14% vs last week</p>
          </div>

          <div className="card glass">
            <h2>Active Deals</h2>
            <h1>128</h1>
            <p className="muted">Pipeline $512k</p>
          </div>

          <div className="card glass">
            <h2>Conversion</h2>
            <h1>26%</h1>
            <p className="muted">Target 30%</p>
          </div>

          <div className="card glass">
            <h2>Monthly Revenue</h2>
            <h1>$86,400</h1>
            <p className="muted">+6% MO</p>
          </div>
        </section>

        {/* Charts grid: second row (3) */}
        <section className="chart-grid">
          <div className="chart-card glass">
            <h3>Patient Leads by Day</h3>
            <BarChart width={340} height={140} data={patient}>
              <XAxis dataKey="day" stroke="var(--muted)" />
              <Tooltip />
              <Bar dataKey="value" fill="var(--accent)" radius={[6,6,0,0]} />
            </BarChart>
          </div>

          <div className="chart-card glass">
            <h3>Top Agents</h3>
            <ul className="agent-list">
              <li>Leads — <span>Kelsey 27%</span></li>
              <li>Bookings — <span>Marsha 22%</span></li>
              <li>Conv Rate — <span>Marsha 88%</span></li>
            </ul>
            <LineChart width={340} height={140} data={patient}>
              <XAxis dataKey="day" stroke="var(--muted)" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="var(--accent2)" strokeWidth={3} />
            </LineChart>
          </div>

          <div className="chart-card glass">
            <h3>Marketing Channels</h3>
            <PieChart width={260} height={160}>
              <Pie data={marketing} dataKey="value" cx="50%" cy="50%" outerRadius={60}>
                {marketing.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>

          {/* Last row: 2 wide cards (we style these via CSS) */}
          <div className="chart-card wide glass">
            <h3>Reasons Not Booked</h3>
            <BarChart width={680} height={160} data={reasons}>
              <XAxis dataKey="day" stroke="var(--muted)" />
              <Tooltip />
              <Bar dataKey="value" fill="var(--accent3)" radius={[6,6,0,0]} />
            </BarChart>
          </div>

          <div className="chart-card wide glass">
            <h3>Recent Leads</h3>
            <div className="table-sample">
              <table>
                <thead>
                  <tr><th>Name</th><th>Source</th><th>Status</th></tr>
                </thead>
                <tbody>
                  <tr><td>John Doe</td><td>Organic</td><td>Contacted</td></tr>
                  <tr><td>Sarah Lee</td><td>Facebook</td><td>Qualified</td></tr>
                  <tr><td>Omar Khan</td><td>Referral</td><td>New</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
