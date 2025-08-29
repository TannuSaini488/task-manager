import React, { useEffect, useState } from "react";
import api from "../utils/api";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);

  const load = async () => {
    const { data } = await api.get("/users");
    setUsers(data);
  };
  useEffect(() => { load(); }, []);

  const changeRole = async (id, role) => {
    await api.patch(`/users/${id}/role`, { role });
    load();
  };

  return (
    <div className="card">
      <h3>Users</h3>
      <table className="table">
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr></thead>
        <tbody>
          {users.map(u=>(
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <select value={u.role} onChange={e=>changeRole(u._id, e.target.value)}>
                  <option value="member">member</option>
                  <option value="admin">admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
