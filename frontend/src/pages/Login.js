import { useState } from "react";
import API from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.access_token);
      window.location.href = "/projects";
    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Unable to login. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#f5f7fa"
    }}>
      <div style={{
        background: "#fff",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: "350px",
        textAlign: "center"
      }}>
        <h2 style={{ marginBottom: "0.5rem" }}>Welcome Back</h2>
        <p style={{ color: "#666", marginBottom: "1.5rem" }}>Sign in to continue</p>

        {error && (
          <div style={{
            background: "#ffe0e0",
            color: "#d00",
            padding: "0.5rem",
            borderRadius: "6px",
            marginBottom: "1rem"
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: "1rem", textAlign: "left" }}>
          <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: "500" }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{
              width: "100%",
              padding: "0.6rem",
              border: "1px solid #ccc",
              borderRadius: "8px"
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem", textAlign: "left" }}>
          <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: "500" }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{
              width: "100%",
              padding: "0.6rem",
              border: "1px solid #ccc",
              borderRadius: "8px"
            }}
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading || !email || !password}
          style={{
            width: "100%",
            padding: "0.8rem",
            background: loading ? "#999" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Logging in…" : "Login"}
        </button>

        <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}
