import { useState, useEffect } from "react";
import axios from "axios";
import "./ResourceHub.css";

function ResourceHub() {
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  // Load resources from backend
  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      const response = await axios.get("http://localhost:5000/api/resources", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setResources(response.data);
    } catch (err) {
      console.error("Error loading resources:", err);
    }
  };

  // Add resource (backend)
  const addResource = async () => {
    if (!title.trim() || !link.trim()) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      const response = await axios.post(
        "http://localhost:5000/api/resources",
        { title, link },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Add new card to UI
      setResources([response.data, ...resources]);

      setTitle("");
      setLink("");
    } catch (err) {
      console.error("Error adding resource:", err);
      alert("Failed to add resource");
    }
  };

  // Delete resource (backend)
  const deleteResource = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      await axios.delete(`http://localhost:5000/api/resources/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update UI
      setResources(resources.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Error deleting resource:", err);
      alert("Delete failed");
    }
  };

  return (
    <div className="resource-container">
      <h2>Resource Hub</h2>

      {/* Input Fields */}
      <div className="resource-inputs">
        <input
          type="text"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Resource URL..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <button onClick={addResource}>Add</button>
      </div>

      {/* Resource Grid */}
      <div className="resource-grid">
        {resources.map((res) => (
          <div key={res._id} className="resource-card">
            {/* Delete */}
            <span
              className="resource-delete"
              onClick={() => deleteResource(res._id)}
            >
              ✖
            </span>

            {/* Title */}
            <div className="resource-title">{res.title}</div>

            {/* Open Button */}
            <button
              className="resource-open-btn"
              onClick={() => window.open(res.link, "_blank")}
            >
              Open
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResourceHub;
