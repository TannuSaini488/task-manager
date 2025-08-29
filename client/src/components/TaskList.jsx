import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pages: 1, total: 0 });
  const [query, setQuery] = useState({
    search: "",
    status: "",
    priority: "",
    page: 1,
    limit: 10,
  });
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    const { search, status, priority, page, limit } = query;
    const { data } = await api.get("/tasks", {
      params: { search, status, priority, page, limit },
    });
    setTasks(data.tasks);
    setMeta({ page: data.page, pages: data.pages, total: data.total });
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks(); /* eslint-disable-next-line */
  }, [query.page, query.status, query.priority]);

  return (
    <div className="card">
      <h3>Tasks</h3>
      <div className="row">
        <input
          placeholder="Search title..."
          value={query.search}
          onChange={(e) => setQuery((q) => ({ ...q, search: e.target.value }))}
        />
        <select
          value={query.status}
          onChange={(e) =>
            setQuery((q) => ({ ...q, status: e.target.value, page: 1 }))
          }
        >
          <option value="">All Status</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In-Progress</option>
          <option value="done">Done</option>
        </select>
        <select
          value={query.priority}
          onChange={(e) =>
            setQuery((q) => ({ ...q, priority: e.target.value, page: 1 }))
          }
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={() => setQuery((q) => ({ ...q, page: 1 }))}>
          Filter
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Due</th>
                <th>Assignee</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
                <tr key={t._id}>
                  <td>
                    <Link to={`/tasks/${t._id}`}>{t.title}</Link>
                  </td>
                  <td>{t.status}</td>
                  <td>{t.priority}</td>
                  <td>
                    {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "-"}
                  </td>
                  <td>{t.assignee?.name || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="row">
            <span>
              Page {meta.page} / {meta.pages} • Total {meta.total}
            </span>
            <div className="spacer" />
            <button
              disabled={meta.page <= 1}
              onClick={() => setQuery((q) => ({ ...q, page: q.page - 1 }))}
            >
              Prev
            </button>
            <button
              disabled={meta.page >= meta.pages}
              onClick={() => setQuery((q) => ({ ...q, page: q.page + 1 }))}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
