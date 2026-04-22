import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/api";
import "./AdminLogin.css";
import bgImage from "../../assets/admin-login.png";

export default function AdminLogin() {
  useEffect(() => {
    document.title = "Log-in | Fresh-Auto Admin";
  }, []);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Eroare la autentificare");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="admin-login-page"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="container">
        <div className="block">
          <form className="login-form" onSubmit={handleLogin}>
            <h1 className="form-title">
              <span>Login</span>
            </h1>

            <div className="form-inputs">
              <div className="input-box">
                <input
                  type="email"
                  className="input-field"
                  placeholder="User Name"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i className="bx bx-user icon"></i>
              </div>

              <div className="input-box">
                <input
                  type="password"
                  className="input-field"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i className="bx bx-lock-alt icon"></i>
              </div>

              <div className="forget-pass">
                <button type="button">Forgot Password</button>
              </div>

              {error && <div className="login-error">{error}</div>}

              <div className="input-box">
                <button
                  className="input-submit"
                  type="submit"
                  disabled={loading}
                >
                  <span>{loading ? "Logging in..." : "Log in"}</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
