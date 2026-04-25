import { useState } from "react";

function TaskInput({ onAdd }) {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");

  const handleSubmit = () => {
    const trimmed = task.trim();
    if (!trimmed) return;
    onAdd({ text: trimmed, dueDate, dueTime });
    setTask("");
    setDueDate("");
    setDueTime("");
  };

  return (
    <div className="task-box">
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
        placeholder="Add a new task..."
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="date-input"
      />

      <input
        type="time"
        value={dueTime}
        onChange={(e) => setDueTime(e.target.value)}
        className="time-input"
      />

      <button onClick={handleSubmit} disabled={!task.trim()}>
        Add task
      </button>
    </div>
  );
}

export default TaskInput;
