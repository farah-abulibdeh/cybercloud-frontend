import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Activity, Home, LayoutDashboard, Lock, Router, Server } from "lucide-react";
import Dashboard from "./pages/Dashboard.jsx";
import Accounts from "./pages/Accounts.jsx";
import Devices from "./pages/Devices.jsx";
import Control from "./pages/Control.jsx";
import Security from "./pages/Security.jsx";

function NavItem({ to, icon, children }) {
  return (
    <NavLink to={to} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
      {icon}
      <span>{children}</span>
    </NavLink>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <aside className="sidebar">
          <div className="brand">
            <div className="brand-icon"><Server size={22} /></div>
            <div>
              <h1>CyberCloud</h1>
              <p>Smart Home Cloud Platform</p>
            </div>
          </div>

          <nav className="nav">
            <NavItem to="/" icon={<LayoutDashboard size={18} />}>Dashboard</NavItem>
            <NavItem to="/accounts" icon={<Home size={18} />}>Accounts & Homes</NavItem>
            <NavItem to="/devices" icon={<Router size={18} />}>Device Registry</NavItem>
            <NavItem to="/control" icon={<Activity size={18} />}>Control & Monitoring</NavItem>
            <NavItem to="/security" icon={<Lock size={18} />}>Security Logs</NavItem>
          </nav>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/control" element={<Control />} />
            <Route path="/security" element={<Security />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}