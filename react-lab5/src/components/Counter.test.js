import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";
import "@testing-library/jest-dom";

test("shows initial count", () => {
  render(<Counter />);
  expect(screen.getByText(/Count:\s*0/i)).toBeInTheDocument();
});

test("increments when clicking Increment", () => {
  render(<Counter />);
  fireEvent.click(screen.getByRole("button", { name: /Increment/i }));
  expect(screen.getByText(/Count:\s*1/i)).toBeInTheDocument();
});

test("decrements when clicking Decrement", () => {
  render(<Counter />);
  // tăng rồi giảm để khẳng định thay đổi đúng hướng
  fireEvent.click(screen.getByRole("button", { name: /Increment/i }));
  fireEvent.click(screen.getByRole("button", { name: /Decrement/i }));
  expect(screen.getByText(/Count:\s*0/i)).toBeInTheDocument();
});

test("resets to 0 when clicking Reset", () => {
  render(<Counter />);
  fireEvent.click(screen.getByRole("button", { name: /Increment/i }));
  fireEvent.click(screen.getByRole("button", { name: /Increment/i }));
  fireEvent.click(screen.getByRole("button", { name: /Reset/i }));
  expect(screen.getByText(/Count:\s*0/i)).toBeInTheDocument();
});
