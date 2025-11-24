import { useState, useEffect } from "react";
import api from "../../api";
import "./MockInterview.css";

function MockInterview() {
  const [category, setCategory] = useState("general");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [evaluations, setEvaluations] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("interview_answers");
    if (saved) setAnswers(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("interview_answers", JSON.stringify(answers));
  }, [answers]);

  const generateQuestions = async () => {
    try {
      setLoading(true);

      const response = await api.post("/mock/generate", { role: category });

      const qs = response.data.questions.filter((q) => q.trim() !== "");
      setQuestions(qs);
      setEvaluations({});
    } catch (err) {
      console.error(err);
      alert("Failed to load questions.");
    }

    setLoading(false);
  };

  const handleAnswer = (q, text) => {
    setAnswers({ ...answers, [q]: text });
  };

  const evaluateAnswer = async (question) => {
    try {
      const answer = answers[question];
      if (!answer || !answer.trim()) {
        return alert("Write an answer first!");
      }

      const response = await api.post("/mock/evaluate", {
        question,
        answer,
      });

      setEvaluations({
        ...evaluations,
        [question]: response.data.evaluation,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to evaluate answer.");
    }
  };

  const clearAll = () => {
    setAnswers({});
    setEvaluations({});
    setQuestions([]);
    localStorage.removeItem("interview_answers");
  };

  return (
    <div className="page-wrapper">
      <div className="mock-box">
        <h2>Mock Interview</h2>

        <select
          className="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="general">General</option>
          <option value="technical">Technical</option>
          <option value="hr">HR</option>
        </select>

        <button onClick={generateQuestions} disabled={loading}>
          {loading ? "Loading..." : "Generate Questions"}
        </button>

        {questions.length > 0 && (
          <div className="question-box">
            {questions.map((q) => (
              <div key={q} className="question-block">
                <p className="question">{q}</p>

                <textarea
                  value={answers[q] || ""}
                  onChange={(e) => handleAnswer(q, e.target.value)}
                  placeholder="Write your answer..."
                />

                <button
                  className="evaluate-btn"
                  onClick={() => evaluateAnswer(q)}
                >
                  Evaluate Answer
                </button>

                {evaluations[q] && (
                  <pre className="output-box">{evaluations[q]}</pre>
                )}
              </div>
            ))}
          </div>
        )}

        <button className="clear-btn" onClick={clearAll}>
          Clear All
        </button>
      </div>
    </div>
  );
}

export default MockInterview;
