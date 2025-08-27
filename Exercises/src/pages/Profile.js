// src/pages/Profile.js
import React from "react";
import { useAuth } from "../auth/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  return (
    <div className="page">
      <div className="card">
        <h2>Your Profile</h2>
        <div className="info">
          <div><strong>Username:</strong> {user?.username}</div>
          <div><strong>Email:</strong> {user?.email}</div>
        </div>
        <p className="muted">This area is protected by JWT.</p>
      </div>
    </div>
  );
}
