import { useState, useEffect } from "react";
import axios from "axios";
import "./Tasks.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Load tasks from backend on start
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      const response = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(response.data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  // Add new task (backend)
  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        { text: newTask },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTasks([response.data, ...tasks]);
      setNewTask("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // Toggle complete (backend update)
  const toggleTask = async (id, currentState) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      const response = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { completed: !currentState },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update UI
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
