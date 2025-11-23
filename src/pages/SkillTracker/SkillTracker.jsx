import { useState, useEffect } from "react";
import axios from "axios";
import "./SkillTracker.css";

function SkillTracker() {
  const [skillName, setSkillName] = useState("");
  const [skills, setSkills] = useState([]);

  // Load skills from backend
  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      const res = await axios.get("http://localhost:5000/api/skills", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSkills(res.data);
    } catch (err) {
      console.error("Error fetching skills:", err);
    }
  };

  // Add Skill (POST)
  const addSkill = async () => {
    if (!skillName.trim()) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      const res = await axios.post(
        "http://localhost:5000/api/skills",
        { name: skillName, level: 50, notes: "" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSkills([res.data, ...skills]);
      setSkillName("");
    } catch (err) {
      console.error("Error adding skill:", err);
    }
  };

  // Update Level (PUT)
  const updateLevel = async (id, value) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      const res = await axios.put(
        `http://localhost:5000/api/skills/${id}`,
        { level: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSkills(skills.map((s) => (s._id === id ? res.data : s)));
    } catch (err) {
      console.error("Error updating level:", err);
    }
  };

  // Update Notes (PUT)
  const updateNotes = async (id, text) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      const res = await axios.put(
        `http://localhost:5000/api/skills/${id}`,
        { notes: text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSkills(skills.map((s) => (s._id === id ? res.data : s)));
    } catch (err) {
      console.error("Error updating notes:", err);
    }
  };

  // Delete skill
  const deleteSkill = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      await axios.delete(`http://localhost:5000/api/skills/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSkills(skills.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Error deleting skill:", err);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="skills-box">
        <h2>Skill Tracker</h2>

        <div className="skill-input-row">
          <input
            type="text"
            placeholder="Enter a skill..."
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
          />
          <button onClick={addSkill}>Add</button>
        </div>

        <div className="skills-container">
          {skills.map((skill) => (
            <div key={skill._id} className="skill-card">

              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <button
                  className="delete-btn"
                  onClick={() => deleteSkill(skill._id)}
                >
                  ✕
                </button>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={skill.level}
                onChange={(e) => updateLevel(skill._id, e.target.value)}
              />

              <p className="skill-level">{skill.level}%</p>

              <textarea
                className="notes-box"
                placeholder="What did you learn?"
                value={skill.notes}
                onChange={(e) => updateNotes(skill._id, e.target.value)}
              />

              {skill.notes.trim() !== "" && (
                <div className="saved-notes">
                  <strong>Saved Notes:</strong>
                  <p>{skill.notes}</p>
                </div>
              )}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkillTracker;
