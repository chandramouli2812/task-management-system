import { useState } from "react";
import API from "../api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError("");
    setLoading(true);

    try {
      await API.post("/auth/register", { name, email, password });
      window.location.href = "/login";
    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Unable to register. Please try again.");
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
        <h2 style={{ marginBottom: "0.5rem" }}>Create Account</h2>
        <p style={{ color: "#666", marginBottom: "1.5rem" }}>Register to get started</p>

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
          <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: "500" }}>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            style={{
              width: "100%",
              padding: "0.6rem",
              border: "1px solid #ccc",
              borderRadius: "8px"
            }}
          />
        </div>

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
          onClick={handleRegister}
          disabled={loading || !name || !email || !password}
          style={{
            width: "100%",
            padding: "0.8rem",
            background: loading ? "#999" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Registering…" : "Register"}
        </button>

        <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
