function Sidebar({ activeFilter, onFilterChange }) {
  return (
    <div className="sidebar">
      <h2>Tasks</h2>

      <ul>
        <li className={activeFilter === "all" ? "active" : ""} onClick={() => onFilterChange("all")}>
          All
        </li>
        <li className={activeFilter === "active" ? "active" : ""} onClick={() => onFilterChange("active")}>
          Active
        </li>
        <li className={activeFilter === "completed" ? "active" : ""} onClick={() => onFilterChange("completed")}>
          Completed
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
