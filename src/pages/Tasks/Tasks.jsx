import { useState, useEffect } from "react";
import api from "../../api";
import "./Tasks.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      const response = await api.post("/tasks", { text: newTask });

      setTasks([response.data, ...tasks]);
      setNewTask("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const toggleTask = async (id, currentState) => {
    try {
      const response = await api.put(`/tasks/${id}`, {
        completed: !currentState,
      });

      setTasks(
        tasks
          .map((task) =>
            task._id === id ? response.data : task
          )
          .sort((a, b) => a.completed - b.completed)
      );
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  return (
    <div className="task-container">
      <h2>My Tasks</h2>

      <div className="task-input-row">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="task-list">
        {tasks.length === 0 && <p className="empty">No tasks added yet.</p>}

        {tasks.map((task) => (
          <div key={task._id} className={`task-card ${task.completed ? "done" : ""}`}>
            <div className="left">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task._id, task.completed)}
              />
              <span className="task-text">{task.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
