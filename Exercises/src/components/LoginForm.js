import React, { useState } from "react";

function validateEmail(v) {
  return /^\S+@\S+\.\S+$/.test(v);
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const [submitted, setSubmitted] = useState(false);

  const emailError =
    !email ? "Email is required." : !validateEmail(email) ? "Invalid email." : "";
  const passwordError =
    !password ? "Password is required." : password.length < 6 ? "Min 6 characters." : "";

  const isValid = !emailError && !passwordError;

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!isValid) return;
    setSubmitted(true);
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          aria-invalid={!!emailError}
          aria-describedby="email-error"
        />
        {touched.email && emailError && (
          <p id="email-error" style={{ color: "crimson", margin: "6px 0 0" }}>
            {emailError}
          </p>
        )}
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, password: true }))}
          aria-invalid={!!passwordError}
          aria-describedby="password-error"
        />
        {touched.password && passwordError && (
          <p id="password-error" style={{ color: "crimson", margin: "6px 0 0" }}>
            {passwordError}
          </p>
        )}
      </div>

      <button type="submit" disabled={!isValid} aria-label="Login">
        Login
      </button>

      {submitted && (
        <p role="alert" style={{ color: "green", marginTop: 12 }}>
          Login successful!
        </p>
      )}
    </form>
  );
}
