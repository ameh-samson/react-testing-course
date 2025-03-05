import { render, screen, logRoles } from "@testing-library/react";
import Sandbox from "./Sandbox";
import userEvent from "@testing-library/user-event";

describe("05-form-testing", () => {
  it("input should be initially empty", () => {
    const { container } = render(<Sandbox />);
    screen.debug();
    logRoles(container);

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    expect(emailInput).toHaveValue("");

    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toHaveValue("");

    const confirmPasswordInput = screen.getByLabelText(/confirm Password/i);
    expect(confirmPasswordInput).toHaveValue("");
  });

  it("should be able to type in the input", async () => {
    const user = userEvent.setup();
    render(<Sandbox />);

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    await user.type(emailInput, "test@test.com");
    expect(emailInput).toHaveValue("test@test.com");

    const passwordInput = screen.getByLabelText("Password");
    await user.type(passwordInput, "password");
    expect(passwordInput).toHaveValue("password");

    const confirmPasswordInput = screen.getByLabelText(/confirm Password/i);
    await user.type(confirmPasswordInput, "confirm password");
    expect(confirmPasswordInput).toHaveValue("confirm password");
  });
});
