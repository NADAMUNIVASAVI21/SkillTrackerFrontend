import "./Landing.css";
import pc from "../../assets/pc.svg";   // <-- correct path
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">

      {/* LEFT SECTION */}
      <div className="content-section">
        <h1 className="main-title">
          TRACK <br /> YOUR <br /> SKILLS BETTER
        </h1>

        <p className="sub-text">
          Stay organized, boost your productivity, and keep all your learning
          progress in one place. SkillTracking helps you grow—one step at a time.
        </p>

        <button className="cta-btn" onClick={() => navigate("/login")}>
          GET STARTED
        </button>
      </div>

      {/* RIGHT SECTION */}
      <div className="angled-section">
        <img src={pc} alt="pc" className="pc-img" />
      </div>

    </div>
  );
}

export default Landing;
