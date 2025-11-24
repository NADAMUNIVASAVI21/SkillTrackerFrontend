import { useState, useEffect } from "react";
import api from "../../api";
import "./SkillTracker.css";

function SkillTracker() {
  const [skillName, setSkillName] = useState("");
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await api.get("/skills");
      setSkills(res.data);
    } catch (err) {
      console.error("Error fetching skills:", err);
    }
  };

  const addSkill = async () => {
    if (!skillName.trim()) return;

    try {
      const res = await api.post("/skills", {
        name: skillName,
        level: 50,
        notes: "",
      });

      setSkills([res.data, ...skills]);
      setSkillName("");
    } catch (err) {
      console.error("Error adding skill:", err);
    }
  };

  const updateLevel = async (id, value) => {
    try {
      const res = await api.put(`/skills/${id}`, { level: value });
      setSkills(skills.map((s) => (s._id === id ? res.data : s)));
    } catch (err) {
      console.error("Error updating level:", err);
    }
  };

  const updateNotes = async (id, text) => {
    try {
      const res = await api.put(`/skills/${id}`, { notes: text });
      setSkills(skills.map((s) => (s._id === id ? res.data : s)));
    } catch (err) {
      console.error("Error updating notes:", err);
    }
  };

  const deleteSkill = async (id) => {
    try {
      await api.delete(`/skills/${id}`);
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
                <button className="delete-btn" onClick={() => deleteSkill(skill._id)}>
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
