import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    API.get("/projects").then((res) => setProjects(res.data));
  }, []);

  const createProject = async () => {
    if (!name.trim()) return;
    await API.post("/projects", { project_name: name });
    setName("");
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  return (
    <div style={{ padding: "2rem", background: "#f5f7fa", minHeight: "100vh" }}>
      <div style={{
        maxWidth: "600px",
        margin: "0 auto",
        background: "#fff",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Projects</h2>

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project Name"
            style={{
              flex: 1,
              padding: "0.6rem",
              border: "1px solid #ccc",
              borderRadius: "8px"
            }}
          />
          <button
            onClick={createProject}
            style={{
              padding: "0.6rem 1rem",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Create
          </button>
        </div>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {projects.map((p) => (
            <li
              key={p.id}
              style={{
                marginBottom: "0.75rem",
                padding: "0.75rem",
                border: "1px solid #eee",
                borderRadius: "8px",
                background: "#fafafa"
              }}
            >
              <Link
                to={`/projects/${p.id}/tasks`}
                style={{
                  textDecoration: "none",
                  color: "#007bff",
                  fontWeight: "500"
                }}
              >
                {p.project_name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
