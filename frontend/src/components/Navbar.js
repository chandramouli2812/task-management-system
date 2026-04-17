import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        background: "#007bff",
        color: "white",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
      }}
    >
      <h2 style={{ margin: 0 }}>Task Manager</h2>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <Link
          to="/login"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "500"
          }}
        >
          Login
        </Link>
        <Link
          to="/register"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "500"
          }}
        >
          Register
        </Link>
        <Link
          to="/projects"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "500"
          }}
        >
          Projects
        </Link>
        <Link
          to="/analytics"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "500"
          }}
        >
          Analytics
        </Link>
      </div>
    </nav>
  );
}
