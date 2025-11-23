import "./Landing.css";
import pc from "../../assets/pc.png";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* LEFT SECTION */}
      <div className="left">
        <h1>
          TRY YOUR FIRST <br /> TRACKER
        </h1>

        <button className="signin-btn" onClick={() => navigate("/login")}>
          SIGN IN
        </button>
      </div>

      {/* RIGHT SECTION */}
      <div className="right">
        <div className="pc-frame">
          <img src={pc} alt="computer" className="pc-img" />
        </div>
      </div>
    </div>
  );
}

export default Landing;
