import { render, screen, logRoles } from "@testing-library/react";
import Sandbox from "./Sandbox";
import userEvent, { UserEvent } from "@testing-library/user-event";

const getFormElements = () => {
  const elements = {
    emailInput: screen.getByRole("textbox", { name: /email/i }),
    passwordInput: screen.getByLabelText("Password"),
    confirmPasswordInput: screen.getByLabelText(/confirm Password/i),
    submitButton: screen.getByRole("button", { name: /submit/i }),
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
    // const { container } = render(<Sandbox />);
    // screen.debug();
    // logRoles(container);

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
});
