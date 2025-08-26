import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "./LoginForm";

test("renders with empty inputs and disabled submit", () => {
  render(<LoginForm />);
  const email = screen.getByLabelText(/email/i);
  const password = screen.getByLabelText(/password/i);
  const submit = screen.getByRole("button", { name: /login/i });

  expect(email).toHaveValue("");
  expect(password).toHaveValue("");
  expect(submit).toBeDisabled();
});

test("shows validation errors for invalid inputs", () => {
  render(<LoginForm />);
  const email = screen.getByLabelText(/email/i);
  const password = screen.getByLabelText(/password/i);

  fireEvent.change(email, { target: { value: "abc" } });
  fireEvent.blur(email);
  expect(screen.getByText(/invalid email/i)).toBeInTheDocument();

  fireEvent.change(password, { target: { value: "123" } });
  fireEvent.blur(password);
  expect(screen.getByText(/min 6 characters/i)).toBeInTheDocument();
});

test("keeps submit disabled when form is invalid", () => {
  render(<LoginForm />);
  const email = screen.getByLabelText(/email/i);
  const password = screen.getByLabelText(/password/i);
  const submit = screen.getByRole("button", { name: /login/i });

  fireEvent.change(email, { target: { value: "bad" } });        // invalid email
  fireEvent.change(password, { target: { value: "123456" } });  // valid password
  expect(submit).toBeDisabled();
});

test("submits successfully with valid inputs", () => {
  render(<LoginForm />);
  const email = screen.getByLabelText(/email/i);
  const password = screen.getByLabelText(/password/i);
  const submit = screen.getByRole("button", { name: /login/i });

  fireEvent.change(email, { target: { value: "user@example.com" } });
  fireEvent.change(password, { target: { value: "123456" } });
  expect(submit).toBeEnabled();

  fireEvent.click(submit);
  expect(screen.getByRole("alert")).toHaveTextContent(/login successful/i);
});
