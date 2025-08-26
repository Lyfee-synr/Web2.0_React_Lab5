// src/App.js
import React from "react";
import "./App.css";

// Exercises 13–18 (đã có của bạn)
import DataLoader from "./components/DataLoader";
import TodoList from "./components/TodoList";
import OptimizedList from "./components/OptimizedList";
import ErrorBoundary from "./components/ErrorBoundary";
import BuggyComponent from "./components/BuggyComponent";
import Modal from "./components/Modal";
import Counter from "./components/Counter";

// NEW — Exercise 19 UI preview
import LoginForm from "./components/LoginForm";

function App() {
  const url = "https://jsonplaceholder.typicode.com/posts/1";

  // Modal (Ex17)
  const [isModalOpen, setModalOpen] = React.useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div style={{ fontFamily: "system-ui, Arial", padding: 24, lineHeight: 1.5 }}>
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>Lab 5 – Exercises 13–19</h1>
        <p style={{ marginTop: 4, color: "#666" }}>
          Advanced React: Patterns · Hooks · Error Boundaries · Portals · Testing
        </p>
      </header>

      {/* 13 */}
      <section style={{ marginBottom: 40 }}>
        <h2>Exercise 13 — Render Props: DataLoader</h2>
        <DataLoader
          url={url}
          render={({ data, loading, error }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p style={{ color: "red" }}>Error{error.message ? `: ${error.message}` : ""}</p>;
            if (!data) return <p>No data</p>;
            return (
              <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16, background: "#fafafa" }}>
                <h3 style={{ marginTop: 0 }}>{data.title}</h3>
                <p style={{ marginBottom: 8 }}>{data.body}</p>
                <small>Post ID: {data.id}</small>
              </div>
            );
          }}
        />
      </section>

      {/* 14 */}
      <section style={{ marginBottom: 40 }}>
        <h2>Exercise 14 — Todo List (useReducer)</h2>
        <TodoList />
      </section>

      {/* 15 */}
      <section style={{ marginBottom: 40 }}>
        <h2>Exercise 15 — Optimized List (React.memo & useCallback)</h2>
        <OptimizedList />
      </section>

      {/* 16 */}
      <section style={{ marginBottom: 40 }}>
        <h2>Exercise 16 — Implementing an Error Boundary</h2>
        <ErrorBoundary>
          <BuggyComponent />
        </ErrorBoundary>
        <p style={{ color: "#666", fontSize: 14, marginTop: 8 }}>
          Click the number until it reaches 5 to simulate a crash.
        </p>
      </section>

      {/* 17 */}
      <section style={{ marginBottom: 40 }}>
        <h2>Exercise 17 — Modal with Portals</h2>
        <button onClick={openModal} style={{ padding: "10px 16px", cursor: "pointer" }}>
          Open Modal
        </button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h3 style={{ marginTop: 0 }}>Hello from Portal Modal</h3>
          <p>
            This content is rendered into <code>#modal-root</code> using <code>ReactDOM.createPortal</code>.
          </p>
          <button onClick={closeModal}>Close</button>
        </Modal>
      </section>

      {/* 18 */}
      <section style={{ marginBottom: 40 }}>
        <h2>Exercise 18 — Testing (React Testing Library)</h2>
        <Counter />
        <p style={{ color: "#666", fontSize: 14, marginTop: 8 }}>
          Tests in <code>src/components/Counter.test.js</code>.
        </p>
      </section>

      {/* 19 */}
      <section style={{ marginBottom: 40 }}>
        <h2>Exercise 19 — Testing a Form Component</h2>
        <LoginForm />
        <p style={{ color: "#666", fontSize: 14, marginTop: 8 }}>
          Tests in <code>src/components/LoginForm.test.js</code>. Run with <code>npm test</code>.
        </p>
      </section>

      <footer style={{ marginTop: 48, color: "#999", fontSize: 14 }}>
        <hr style={{ margin: "24px 0" }} />
        <div>Web 2.0 – Intermediate React · Lab 5</div>
      </footer>
    </div>
  );
}

export default App;
