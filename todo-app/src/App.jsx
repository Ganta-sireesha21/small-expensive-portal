import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { supabase } from "./supabase.js";
import "./index.css";

const TASK_STATUS_KEY = "todo-app-task-status";

function loadTaskStatuses() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(TASK_STATUS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function saveTaskStatuses(statuses) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TASK_STATUS_KEY, JSON.stringify(statuses));
}

function mergeTaskStatuses(tasks) {
  const statuses = loadTaskStatuses();
  return tasks.map((task) => ({
    ...task,
    completed: statuses[task.id]?.completed ?? false,
    dueDate: statuses[task.id]?.dueDate || "",
    dueTime: statuses[task.id]?.dueTime || "",
  }));
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  // Fetch from backend
  const fetchTasks = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("todos").select("*");
    setLoading(false);

    if (error) {
      console.error("Failed to load tasks:", error);
      return;
    }

    setTasks(mergeTaskStatuses(data || []));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  const activeCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.filter((task) => task.completed).length;

  // Add task
  const addTask = async ({ text, dueDate, dueTime }) => {
    const { data, error } = await supabase
      .from("todos")
      .insert([{ text }])
      .select("id")
      .single();

    if (error || !data) {
      console.error("Failed to add task:", error);
      return;
    }

    const statuses = loadTaskStatuses();
    statuses[data.id] = {
      completed: false,
      dueDate: dueDate || "",
      dueTime: dueTime || "",
    };
    saveTaskStatuses(statuses);

    fetchTasks();
  };

  // Delete task
  const deleteTask = async (id) => {
    await supabase.from("todos").delete().eq("id", id);

    const statuses = loadTaskStatuses();
    delete statuses[id];
    saveTaskStatuses(statuses);

    fetchTasks();
  };

  const toggleComplete = (id) => {
    setTasks((prev) => {
      const statuses = loadTaskStatuses();

      return prev.map((task) => {
        if (task.id !== id) return task;

        const updated = { ...task, completed: !task.completed };
        statuses[id] = {
          ...statuses[id],
          completed: updated.completed,
          dueDate: task.dueDate || "",
          dueTime: task.dueTime || "",
        };
        saveTaskStatuses(statuses);

        return updated;
      });
    });
  };

  return (
    <div className="app">
      <Sidebar activeFilter={filter} onFilterChange={setFilter} />

      <div className="main">
        <h1>Todo list</h1>
        <p>
          {tasks.length === 0
            ? "No tasks yet"
            : `${tasks.length} task${tasks.length > 1 ? "s" : ""} • ${activeCount} active • ${completedCount} completed`}
        </p>

        <TaskInput onAdd={addTask} />

        <div className="filter-status">
          <span className={filter === "all" ? "filter-pill active" : "filter-pill"} onClick={() => setFilter("all")}>All</span>
          <span className={filter === "active" ? "filter-pill active" : "filter-pill"} onClick={() => setFilter("active")}>Active</span>
          <span className={filter === "completed" ? "filter-pill active" : "filter-pill"} onClick={() => setFilter("completed")}>Completed</span>
        </div>

        {loading ? <p className="loading">Loading tasks...</p> : <TaskList tasks={filteredTasks} onDelete={deleteTask} onToggleComplete={toggleComplete} />}
      </div>
    </div>
  );
}

export default App;
