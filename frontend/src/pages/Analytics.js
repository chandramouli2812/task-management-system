import { useEffect, useState } from "react";
import API from "../api";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/analytics/tasks").then(res => setData(res.data));
  }, []);

  if (!data) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p>Loading analytics...</p>
      </div>
    );
  }

  const pieData = [
    { name: "Completed", value: data.completed },
    { name: "Pending", value: data.pending },
    { name: "Total", value: data.total }
  ];

  const COLORS = ["#00C49F", "#FF8042", "#0088FE"];

  return (
    <div style={{ padding: "2rem", background: "#f5f7fa", minHeight: "100vh" }}>
      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        background: "#fff",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Task Analytics</h2>

        <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "2rem" }}>
          {/* Pie Chart */}
          <div style={{ flex: "1 1 300px", textAlign: "center" }}>
            <h3>Status Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div style={{ flex: "1 1 400px", textAlign: "center" }}>
            <h3>Tasks per Project</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.per_project}>
                <XAxis dataKey="project_name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
