import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.ok) nav("/");
    else setErr(res.message || "Login failed");
  };

  return (
    <form className="card narrow" onSubmit={submit}>
      <h2>Login</h2>
      {err && <p className="error">{err}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button disabled={loading}>{loading ? "Signing in..." : "Login"}</button>
      <p>
        No account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
}
