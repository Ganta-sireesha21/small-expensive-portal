import { MdDashboard, MdLogout } from 'react-icons/md';
import '../styles/Sidebar.css';

export default function Sidebar({ onLogout, activeTab, onTabChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`nav-item ${activeTab === 'jobs' ? 'active' : ''}`}
          onClick={() => onTabChange('jobs')}
        >
          <MdDashboard className="nav-icon" />
          <span>Jobs</span>
        </button>
      </nav>

      <button className="nav-item logout-btn" onClick={onLogout}>
        <MdLogout className="nav-icon" />
        <span>Logout</span>
      </button>
    </aside>
  );
}
