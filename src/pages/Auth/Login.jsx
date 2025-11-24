import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Auth.css";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        return setError("All fields required");
      }

      await login(email, password);
      navigate("/tasks");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-box">
      <h2>Sign In</h2>

      {error && <p className="error">{error}</p>}

      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p>
        Don’t have an account?{" "}
        <span className="link" onClick={() => navigate("/signup")}>
          Sign Up
        </span>
      </p>
    </div>
  );
}

export default Login;
