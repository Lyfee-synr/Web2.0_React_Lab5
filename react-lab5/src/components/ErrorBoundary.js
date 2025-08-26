// src/components/ErrorBoundary.js
import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Cập nhật state để hiển thị UI dự phòng
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log lỗi (có thể gửi lên service như Sentry)
    console.error("Caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // UI dự phòng
      return (
        <div
          style={{
            border: "2px solid #e00",
            padding: 16,
            borderRadius: 8,
            background: "#ffecec",
            color: "#a40000",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Something went wrong.</h3>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            {"\n"}
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <p style={{ marginTop: 12 }}>
            Please refresh the page or try again later.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
