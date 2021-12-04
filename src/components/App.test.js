import { render, screen, fireEvent, queryByText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("1: Test Sign Up Page", () => {
  const { queryByTestId } = render(<App />);
  expect(queryByTestId("signup-title")).toBeInTheDocument();
});

test("2: Signup With Empty Email", () => {
  const { queryByTestId } = render(<App />);
  //fireEvent.input(queryByTestId("signup-username-tf"), "test");

  fireEvent.click(queryByTestId("signup-signup1-btn"));
  expect(queryByTestId("signup-email-error")).toBeInTheDocument();
});

test("3: Signup With Empty Username", () => {
  const { getByTestId, queryByTestId } = render(<App />);
  const InputEl = getByTestId("signup-email-tf").querySelector("input");
  fireEvent.change(InputEl, {
    target: { value: "test@usc.edu" },
  });

  expect(InputEl.value).toBe("test@usc.edu");

  fireEvent.click(queryByTestId("signup-signup1-btn"));
  expect(queryByTestId("signup-username-error")).toBeInTheDocument();
});

test("4: Signup With Empty Password", () => {
  const { queryByTestId } = render(<App />);
  const emailInput = queryByTestId("signup-email-tf").querySelector("input");
  const usernameInput =
    queryByTestId("signup-username-tf").querySelector("input");

  fireEvent.change(emailInput, {
    target: { value: "test@usc.edu" },
  });

  fireEvent.change(usernameInput, {
    target: { value: "test" },
  });

  fireEvent.click(queryByTestId("signup-signup1-btn"));
  expect(queryByTestId("signup-password-error")).toBeInTheDocument();
});

test("5: Signup With Incorrectly formatted Email", () => {
  const { queryByTestId } = render(<App />);
  const InputEl = queryByTestId("signup-email-tf").querySelector("input");
  fireEvent.change(InputEl, {
    target: { value: "ill format email" },
  });

  fireEvent.click(queryByTestId("signup-signup1-btn"));
  expect(queryByTestId("signup-email-error")).toBeInTheDocument();
});

test("6: Signup Reset", () => {
  const { queryByTestId } = render(<App />);
  const emailInput = queryByTestId("signup-email-tf").querySelector("input");
  const usernameInput =
    queryByTestId("signup-username-tf").querySelector("input");
  const passwordInput =
    queryByTestId("signup-password-tf").querySelector("input");

  fireEvent.change(emailInput, {
    target: { value: "test@usc.edu" },
  });

  fireEvent.change(usernameInput, {
    target: { value: "test" },
  });

  fireEvent.change(passwordInput, {
    target: { value: "123" },
  });

  expect(emailInput.value).toBe("test@usc.edu");
  expect(usernameInput.value).toBe("test");
  expect(passwordInput.value).toBe("123");

  fireEvent.click(queryByTestId("signup-reset-btn"));
  expect(emailInput.value).toBe("");
  expect(usernameInput.value).toBe("");
  expect(passwordInput.value).toBe("");
});

test("7: Signup To Login Page", () => {
  const { queryByTestId } = render(<App />);
  fireEvent.click(queryByTestId("signup-to-login-btn"));
  expect(queryByTestId("login-title")).toBeInTheDocument();
});

test("8: Login With Empty Username", () => {
  const { queryByTestId } = render(<App />);
  fireEvent.click(queryByTestId("signup-to-login-btn"));
  expect(queryByTestId("login-title")).toBeInTheDocument();

  fireEvent.click(queryByTestId("login-login-btn"));
  expect(queryByTestId("login-username-error")).toBeInTheDocument();
});

test("9: Login With Empty Password", () => {
  const { queryByTestId } = render(<App />);
  fireEvent.click(queryByTestId("signup-to-login-btn"));
  expect(queryByTestId("login-title")).toBeInTheDocument();

  const usernameInput =
    queryByTestId("login-username-tf").querySelector("input");
  fireEvent.change(usernameInput, { target: { value: "test" } });

  fireEvent.click(queryByTestId("login-login-btn"));
  expect(queryByTestId("login-password-error")).toBeInTheDocument();
});

test("10: Login Reset Form", () => {
  const { queryByTestId } = render(<App />);
  fireEvent.click(queryByTestId("signup-to-login-btn"));
  expect(queryByTestId("login-title")).toBeInTheDocument();

  const usernameInput =
    queryByTestId("login-username-tf").querySelector("input");
  fireEvent.change(usernameInput, { target: { value: "test" } });

  const passwordInput =
    queryByTestId("login-password-tf").querySelector("input");
  fireEvent.change(passwordInput, { target: { value: "123" } });

  expect(usernameInput.value).toBe("test");
  expect(passwordInput.value).toBe("123");

  fireEvent.click(queryByTestId("login-reset-btn"));
  expect(usernameInput.value).toBe("");
  expect(passwordInput.value).toBe("");
});
