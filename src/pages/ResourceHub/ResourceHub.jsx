import { useState, useEffect } from "react";
import api from "../../api";
import "./ResourceHub.css";

function ResourceHub() {
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await api.get("/resources");
      setResources(response.data);
    } catch (err) {
      console.error("Error loading resources:", err);
    }
  };

  const addResource = async () => {
    if (!title.trim() || !link.trim()) return;

    try {
      const response = await api.post("/resources", { title, link });
      setResources([response.data, ...resources]);
      setTitle("");
      setLink("");
    } catch (err) {
      console.error("Error adding resource:", err);
      alert("Failed to add resource");
    }
  };

  const deleteResource = async (id) => {
    try {
      await api.delete(`/resources/${id}`);
      setResources(resources.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Error deleting resource:", err);
      alert("Delete failed");
    }
  };

  return (
    <div className="resource-container">
      <h2>Resource Hub</h2>

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

      <div className="resource-grid">
        {resources.map((res) => (
          <div key={res._id} className="resource-card">
            <span className="resource-delete" onClick={() => deleteResource(res._id)}>
              ✖
            </span>
            <div className="resource-title">{res.title}</div>
            <button className="resource-open-btn" onClick={() => window.open(res.link, "_blank")}>
              Open
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResourceHub;
