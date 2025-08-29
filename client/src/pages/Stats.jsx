import React, { useEffect, useState } from "react";
import axios from "axios"; 
import '../styles.css';
import api from "../utils/api";

export default function Stats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(
          "/stats/overview",
          { withCredentials: true },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="stats-container">Loading stats...</div>;

  if (!stats)
    return <div className="stats-container" style={{ color: "red" }}>Failed to load stats</div>;

  return (
    <div className="stats-container">
      <h1 className="stats-header">📊 Task Statistics</h1>

      <div className="stats-grid">
        {/* Status Counts */}
        <div className="stats-card">
          <h2>By Status</h2>
          <ul className="stats-list">
            {Object.entries(stats.byStatus).map(([status, count]) => (
              <li key={status}>
                <span>{status}</span>
                <span>{count}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Priority Counts */}
        <div className="stats-card">
          <h2>By Priority</h2>
          <ul className="stats-list">
            {Object.entries(stats.byPriority).map(([priority, count]) => (
              <li key={priority}>
                <span>{priority}</span>
                <span>{count}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Overdue */}
        <div className="stats-card">
          <h2>Overdue</h2>
          <p className="stats-overdue">{stats.overdueTasks}</p>
        </div>
      </div>
    </div>
  );
}
