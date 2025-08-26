import React, { useState, useCallback } from "react";
import ListItem from "./ListItem";

export default function OptimizedList() {
  // State: list of items
  const [items, setItems] = useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Practice useCallback" },
    { id: 3, text: "Optimize with React.memo" },
  ]);

  // Another state that will trigger parent re-render but not children
  const [count, setCount] = useState(0);

  // useCallback ensures handleDeleteItem is stable unless setItems changes
  const handleDeleteItem = useCallback(
    (id) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    },
    [setItems]
  );

  return (
    <div style={{ marginTop: 24 }}>
      <h2>Exercise 15 — Optimized List with React.memo & useCallback</h2>

      <button onClick={() => setCount((c) => c + 1)}>
        Increment Parent State (Count = {count})
      </button>

      <ul style={{ listStyle: "none", padding: 0, marginTop: 16 }}>
        {items.map((item) => (
          <ListItem key={item.id} item={item} onDelete={handleDeleteItem} />
        ))}
      </ul>
    </div>
  );
}
