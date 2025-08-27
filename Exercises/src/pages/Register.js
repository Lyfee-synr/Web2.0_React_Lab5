// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  function onChange(e) { setForm((f) => ({ ...f, [e.target.name]: e.target.value })); }

  function validate() {
    if (!form.username || form.username.length < 3) return "Username must be at least 3 characters.";
    if (!form.email.includes("@")) return "Invalid email.";
    if (!form.password || form.password.length < 6) return "Password must be at least 6 characters.";
    return "";
  }

  async function onSubmit(e) {
    e.preventDefault();
    const v = validate(); if (v) return setErr(v);
    setErr(""); setBusy(true);
    try {
      await register(form);
      nav("/profile", { replace: true });
    } catch (e) { setErr(e.message || "Registration failed"); }
    finally { setBusy(false); }
  }

  return (
    <div className="page">
      <div className="card">
        <h2>Create an account</h2>
        <p className="muted">Join our café community</p>
        <form onSubmit={onSubmit} className="form">
          <label>Username</label>
          <input name="username" placeholder="cafegirl" value={form.username} onChange={onChange} />
          <label>Email</label>
          <input name="email" type="email" placeholder="you@cafepink.dev" value={form.email} onChange={onChange} />
          <label>Password</label>
          <input name="password" type="password" placeholder="••••••••" value={form.password} onChange={onChange} />
          {err && <div className="error">{err}</div>}
          <button className="btn wide" disabled={busy}>{busy ? "Creating..." : "Register"}</button>
        </form>
        <p className="muted small">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}
