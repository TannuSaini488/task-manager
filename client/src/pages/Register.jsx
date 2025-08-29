import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register, loading } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await register(form);
    if (res.ok) nav("/");
    else setErr(res.message || "Registration failed");
  };

  return (
    <form className="card narrow" onSubmit={submit}>
      <h2>Register</h2>
      {err && <p className="error">{err}</p>}
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <button disabled={loading}>
        {loading ? "Creating..." : "Create account"}
      </button>
      <p>
        Have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
}
