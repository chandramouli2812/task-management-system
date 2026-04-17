import { useCallback, useEffect, useState } from "react";
import API from "../api";
import { useParams } from "react-router-dom";

export default function Tasks() {
  const { id: projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  const loadTasks = useCallback(async () => {
    if (!projectId) return;
    const res = await API.get(`/tasks/projects/${projectId}`);
    setTasks(res.data);
  }, [projectId]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const createTask = async () => {
    if (!title.trim() || !description.trim()) return;
    await API.post("/tasks", {
      project_id: projectId,
      title,
      description,
      status,
    });
    setTitle("");
    setDescription("");
    setStatus("Pending");
    loadTasks();
  };

  const updateTask = async (taskId, newStatus) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    await API.put(`/tasks/${taskId}`, {
      project_id: projectId,
      title: task.title,
      description: task.description,
      status: newStatus,
    });
    loadTasks();
  };

  const deleteTask = async (taskId) => {
    await API.delete(`/tasks/${taskId}`);
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  return (
    <div style={{ padding: "2rem", background: "#f5f7fa", minHeight: "100vh" }}>
      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        background: "#fff",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Tasks for Project {projectId}
        </h2>

        {/* Task creation form */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            style={{
              flex: "1 1 200px",
              padding: "0.6rem",
              border: "1px solid #ccc",
              borderRadius: "8px"
            }}
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            style={{
              flex: "2 1 300px",
              padding: "0.6rem",
              border: "1px solid #ccc",
              borderRadius: "8px"
            }}
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{
              padding: "0.6rem",
              border: "1px solid #ccc",
              borderRadius: "8px"
            }}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button
            onClick={createTask}
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
            Add Task
          </button>
        </div>

        {/* Task list */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                marginBottom: "1rem",
                padding: "1rem",
                border: "1px solid #eee",
                borderRadius: "8px",
                background: "#fafafa",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap"
              }}
            >
              <div>
                <strong>{task.title}</strong> <br />
                <span style={{ color: "#666" }}>{task.description}</span> <br />
                <span style={{ fontStyle: "italic", color: "#007bff" }}>
                  {task.status}
                </span>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                <button
                  onClick={() => updateTask(task.id, "In Progress")}
                  style={{
                    padding: "0.4rem 0.8rem",
                    background: "#ffc107",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Start
                </button>
                <button
                  onClick={() => updateTask(task.id, "Completed")}
                  style={{
                    padding: "0.4rem 0.8rem",
                    background: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Complete
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    padding: "0.4rem 0.8rem",
                    background: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
