// src/components/BuggyComponent.js
import React from "react";

/**
 * Component cố tình throw error khi count === 5.
 * Lưu ý: ErrorBoundary chỉ bắt lỗi trong quá trình render,
 * lifecycle, constructor của cây con; không bắt lỗi trong event handler.
 */
export default function BuggyComponent() {
  const [count, setCount] = React.useState(0);

  // Throw trong render để ErrorBoundary bắt được
  if (count === 5) {
    throw new Error("BuggyComponent crashed at count === 5");
  }

  return (
    <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      <p>Click the number. It will crash when it reaches 5.</p>
      <h2
        onClick={() => setCount((c) => c + 1)}
        style={{ userSelect: "none", cursor: "pointer", margin: 0 }}
        title="Click me to increase"
      >
        {count}
      </h2>
    </div>
  );
}
