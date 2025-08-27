// src/pages/Tasks.js
import React, { useEffect, useState } from "react";
import { api } from "../api/client";

export default function Tasks() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function load() {
    try {
      const data = await api.get("/api/tasks");
      setItems(data);
    } catch (e) { setErr(e.message); }
  }
  useEffect(() => { load(); }, []);

  async function addTask(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setBusy(true);
    try {
      await api.post("/api/tasks", { title, description: "" });
      setTitle("");
      load();
    } catch (e) { setErr(e.message); }
    finally { setBusy(false); }
  }

  return (
    <div className="page">
      <div className="card">
        <h2>Your Tasks</h2>
        <form className="row" onSubmit={addTask}>
          <input placeholder="Add a task..." value={title} onChange={(e)=>setTitle(e.target.value)} />
          <button className="btn" disabled={busy}>{busy ? "Adding..." : "Add"}</button>
        </form>
        {err && <div className="error">{err}</div>}
        <ul className="list">
          {items.map(t => (
            <li key={t._id}>{t.title} {t.completed ? "✅" : ""}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
