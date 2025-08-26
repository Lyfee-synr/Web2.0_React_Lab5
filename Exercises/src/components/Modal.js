// src/components/Modal.js
import React, { useEffect } from "react";
import ReactDOM from "react-dom";

export default function Modal({ isOpen, onClose, children }) {
  // GỌI HOOKS Ở ĐẦU COMPONENT (không gọi conditionally)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lấy portal root sau khi gọi hooks
  const modalRoot = document.getElementById("modal-root");

  // Điều kiện không hiển thị modal
  if (!isOpen || !modalRoot) return null;

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };

  const contentStyle = {
    background: "#fff",
    borderRadius: 12,
    padding: 24,
    maxWidth: 520,
    width: "90%",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    position: "relative",
  };

  const closeBtnStyle = {
    position: "absolute",
    top: 10,
    right: 12,
    fontSize: 20,
    background: "transparent",
    border: "none",
    cursor: "pointer",
  };

  const stop = (e) => e.stopPropagation();

  return ReactDOM.createPortal(
    <div style={overlayStyle} onClick={onClose} aria-modal="true" role="dialog">
      <div style={contentStyle} onClick={stop}>
        <button style={closeBtnStyle} aria-label="Close modal" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}
