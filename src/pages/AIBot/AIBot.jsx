import { useState, useEffect } from "react";
import axios from "axios";
import "./AIBot.css";

function AIBot() {
  const [goal, setGoal] = useState("");
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load saved history
  useEffect(() => {
    const saved = localStorage.getItem("ai_history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  // Save whenever history updates
  useEffect(() => {
    localStorage.setItem("ai_history", JSON.stringify(history));
  }, [history]);

  const generateRoadmap = async () => {
    if (!goal.trim()) return;

    try {
      setLoading(true);

      // Get user token
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      // Call backend route
      const response = await axios.post(
        "https://skilltrackerbackend-production.up.railway.app/api/ai-bot/generate",
        { goal },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const roadmap = response.data.output;

      setOutput(roadmap);

      setHistory([{ id: Date.now(), goal, roadmap }, ...history]);

      setGoal("");
    } catch (err) {
      console.error(err);
      setOutput("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("ai_history");
  };

  return (
    <div className="page-wrapper">
      <div className="ai-box">
        <h2>AI Career Roadmap Bot</h2>

        <input
          type="text"
          placeholder="Enter your goal (e.g., Become a Data Scientist)"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="goal-input"
        />

        <button onClick={generateRoadmap} disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>

        {output && (
          <pre className="output-box">{output}</pre>
        )}

        {history.length > 0 && (
          <div className="history-box">
            <h3>Previous Roadmaps</h3>

            {history.map((item) => (
              <div key={item.id} className="history-card">
                <strong>{item.goal}</strong>
                <pre>{item.roadmap}</pre>
              </div>
            ))}

            <button className="clear-btn" onClick={clearHistory}>
              Clear History
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIBot;
