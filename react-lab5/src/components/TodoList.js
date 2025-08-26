import React, { useReducer, useState } from "react";

const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const REMOVE_TODO = "REMOVE_TODO";

// Fallback tạo id nếu trình duyệt không có crypto.randomUUID
function genId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function todosReducer(state, action) {
  switch (action.type) {
    case ADD_TODO: {
      const text = action.payload?.text?.trim();
      if (!text) return state;
      return [{ id: genId(), text, completed: false }, ...state];
    }
    case TOGGLE_TODO: {
      const id = action.payload?.id;
      return state.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
    }
    case REMOVE_TODO: {
      const id = action.payload?.id;
      return state.filter((t) => t.id !== id);
    }
    default:
      return state;
  }
}

export default function TodoList() {
  const [todos, dispatch] = useReducer(todosReducer, []);
  const [input, setInput] = useState("");

  const onAdd = (e) => {
    e.preventDefault();
    dispatch({ type: ADD_TODO, payload: { text: input } });
    setInput("");
  };

  return (
    <div style={{ marginTop: 24 }}>
      <h2>Exercise 14 — Todo List (useReducer)</h2>

      <form
        onSubmit={onAdd}
        style={{ display: "flex", gap: 8, marginBottom: 16 }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo..."
          style={{ flex: 1, padding: 8 }}
          aria-label="New todo"
        />
        <button type="submit">Add</button>
      </form>

      {todos.length === 0 ? (
        <p>No todos yet. Add one!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "8px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  dispatch({ type: TOGGLE_TODO, payload: { id: todo.id } })
                }
                aria-label={`Toggle ${todo.text}`}
              />
              <span
                style={{
                  flex: 1,
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "#999" : "inherit",
                }}
              >
                {todo.text}
              </span>
              <button
                onClick={() =>
                  dispatch({ type: REMOVE_TODO, payload: { id: todo.id } })
                }
                aria-label={`Remove ${todo.text}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
