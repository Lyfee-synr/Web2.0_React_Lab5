// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  function onChange(e) { setForm((f) => ({ ...f, [e.target.name]: e.target.value })); }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    if (!form.email || !form.password) return setErr("Please enter email and password.");
    setBusy(true);
    try {
      await login(form);
      const to = loc.state?.from?.pathname || "/profile";
      nav(to, { replace: true });
    } catch (e) {
      setErr(e.message || "Login failed");
    } finally { setBusy(false); }
  }

  return (
    <div className="page">
      <div className="card">
        <h2>Welcome back</h2>
        <p className="muted">Log in to your café account</p>
        <form onSubmit={onSubmit} className="form">
          <label>Email</label>
          <input name="email" type="email" placeholder="you@cafepink.dev" value={form.email} onChange={onChange} />
          <label>Password</label>
          <input name="password" type="password" placeholder="••••••••" value={form.password} onChange={onChange} />
          {err && <div className="error">{err}</div>}
          <button className="btn wide" disabled={busy}>{busy ? "Signing in..." : "Login"}</button>
        </form>
        <p className="muted small">No account? <Link to="/register">Create one</Link></p>
      </div>
    </div>
  );
}
