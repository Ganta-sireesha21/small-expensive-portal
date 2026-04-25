function TaskList({ tasks, onDelete, onToggleComplete }) {
  if (tasks.length === 0) {
    return <p className="empty">Nothing here yet</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div className="task-item" key={task.id}>
          <label className={`task-content ${task.completed ? "completed" : ""}`}>
            <input
              type="checkbox"
              checked={!!task.completed}
              onChange={() => onToggleComplete(task.id)}
            />
            <div>
              <span>{task.text}</span>
              {(task.dueDate || task.dueTime) && (
                <div className="task-meta">
                  Due {task.dueDate || "any time"}
                  {task.dueTime ? ` @ ${task.dueTime}` : ""}
                </div>
              )}
            </div>
          </label>
          <button className="delete-button" onClick={() => onDelete(task.id)}>
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
