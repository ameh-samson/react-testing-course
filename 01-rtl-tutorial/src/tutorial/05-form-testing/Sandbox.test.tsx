import { render, screen, logRoles } from "@testing-library/react";
import Sandbox from "./Sandbox";
import userEvent, { UserEvent } from "@testing-library/user-event";

const getFormElements = () => {
  const elements = {
    emailInput: screen.getByRole("textbox", { name: /email/i }),
    passwordInput: screen.getByLabelText("Password"),
    confirmPasswordInput: screen.getByLabelText(/confirm Password/i),
    submitButton: screen.getAllByRole("button", { name: /submit/i }),
  };

  return elements;
};

describe("05-form-testing", () => {
  let user: UserEvent;
  beforeEach(() => {
    user = userEvent.setup();
    render(<Sandbox />);
  });

  it("input should be initially empty", () => {
    const { container } = render(<Sandbox />);
    screen.debug();
    logRoles(container);

    const { emailInput, passwordInput, confirmPasswordInput } =
      getFormElements();

    expect(emailInput).toHaveValue("");

    expect(passwordInput).toHaveValue("");

    expect(confirmPasswordInput).toHaveValue("");
  });

  it("should be able to type in the input", async () => {
    const { emailInput, passwordInput, confirmPasswordInput } =
      getFormElements();

    await user.type(emailInput, "test@test.com");
    expect(emailInput).toHaveValue("test@test.com");

    await user.type(passwordInput, "password");
    expect(passwordInput).toHaveValue("password");

    await user.type(confirmPasswordInput, "confirm password");
    expect(confirmPasswordInput).toHaveValue("confirm password");
  });

  it("should show email error if email is invalid", async () => {
    const { emailInput, submitButton } = getFormElements();

    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();

    await user.type(emailInput, "invalid");
    await user.click(submitButton[0]);

    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });

  it("should show password error if password is less than 5 characters", async () => {
    const { emailInput, submitButton, passwordInput } = getFormElements();

    expect(
      screen.queryByText(/password must be at least 5 characters/i)
    ).not.toBeInTheDocument();

    await user.type(emailInput, "test@test.com");
    await user.type(passwordInput, "abcd");
    await user.click(submitButton[0]);

    expect(
      screen.getByText(/password must be at least 5 characters/i)
    ).toBeInTheDocument();
  });

  it("should show  error if password don't match", async () => {
    const { emailInput, submitButton, passwordInput, confirmPasswordInput } =
      getFormElements();

    const errorMsg = /passwords do not match/i;
    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument();

    await user.type(emailInput, "test@test.com");
    await user.type(passwordInput, "secret");
    await user.type(confirmPasswordInput, "notsecret");
    await user.click(submitButton[0]);

    expect(screen.getByText(errorMsg)).toBeInTheDocument();
  });

  it("valid inputs show no errors and clear fiels", async () => {
    const { emailInput, submitButton, passwordInput, confirmPasswordInput } =
      getFormElements();

    await user.type(emailInput, "test@test.com");
    await user.type(passwordInput, "secret");
    await user.type(confirmPasswordInput, "secret");
    await user.click(submitButton[0]);

    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/password must be at least 5 characters/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/passwords do not match/i)
    ).not.toBeInTheDocument();

    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
    expect(confirmPasswordInput).toHaveValue("");
  });
});
