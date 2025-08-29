import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="nav">
      <div className="brand"><Link to="/">TaskManager</Link></div>
      <div className="spacer" />
      {user ? (
        <>
          <Link to="/">Tasks</Link>
          <Link to="/stats">Stats</Link>
          {user.role === "admin" && <Link to="/admin">Admin</Link>}
          <span className="user">{user.name} ({user.role})</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register" className="btn">Register</Link>
        </>
      )}
    </nav>
  );
}
