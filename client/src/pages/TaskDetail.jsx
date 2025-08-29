import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function TaskDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [task, setTask] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data } = await api.get(`/tasks/${id}`);
    setTask(data);
  };
  useEffect(() => {
    load(); 
  }, [id]);

  const save = async () => {
    setSaving(true);
    await api.put(`/tasks/${id}`, task);
    setSaving(false);
  };
  const del = async () => {
    await api.delete(`/tasks/${id}`);
    nav("/");
  };

  if (!task) return <p className="card">Loading...</p>;

  return (
    <div className="card">
      <h3>Edit Task</h3>

      <div className="row">
        <input
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />
      <textarea
        value={task.description || ""}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />
        <select
          value={task.status}
          onChange={(e) => setTask({ ...task, status: e.target.value })}
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In-Progress</option>
          <option value="done">Done</option>
        </select>
        <select
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          value={
            task.dueDate
              ? new Date(task.dueDate).toISOString().slice(0, 10)
              : ""
          }
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        />
      </div>
      <button onClick={save} disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </button>
      <button onClick={del} className="danger">
        Delete
      </button>
    </div>
  );
}
