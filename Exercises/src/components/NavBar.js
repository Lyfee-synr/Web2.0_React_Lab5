// src/components/NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function NavBar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link className="brand" to="/">☕ Café Pink</Link>
        <Link to="/tasks" className="nav-link">Tasks</Link>
      </div>
      <div className="nav-right">
        {!isAuthenticated ? (
          <>
            <Link className="btn ghost" to="/login">Login</Link>
            <Link className="btn" to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/profile">Hi, {user?.username || "User"}</Link>
            <button className="btn danger" onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
