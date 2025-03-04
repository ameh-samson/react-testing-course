import { render, screen, logRoles, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sandbox from "./Sandbox";

describe("04-user-interaction", () => {
  test("Screen Debug", () => {
    screen.debug();
    const { container } = render(<Sandbox />);
    logRoles(container);
  });

  it("should increment and decrement count using fireEvent", () => {
    render(<Sandbox />);

    const incrementBtn = screen.getByRole("button", { name: /increase/i });
    const decreaseBtn = screen.getByRole("button", { name: /decrease/i });

    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();

    fireEvent.click(incrementBtn);
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();

    fireEvent.click(decreaseBtn);
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
  });

  it("should increment and decrement count using userEvent", async () => {
    render(<Sandbox />);

    const user = userEvent.setup();

    const incrementBtn = screen.getByRole("button", { name: /increase/i });
    const decreaseBtn = screen.getByRole("button", { name: /decrease/i });

    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();

    await user.click(incrementBtn);
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();

    await user.click(decreaseBtn);
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
  });

  it("toggles between unlike and like button when clicked", async () => {
    render(<Sandbox />);
    const user = userEvent.setup();

    const unlikeBtn = screen.getByRole("button", { name: "unlike button" });
    expect(unlikeBtn).toBeInTheDocument();

    // the button is not present, hence the reason for query
    expect(
      screen.queryByRole("button", { name: "like button" })
    ).not.toBeInTheDocument();

    await user.click(unlikeBtn);
    const likeBtn = screen.getByRole("button", { name: "like button" });
    expect(likeBtn).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "unlike button" })
    ).not.toBeInTheDocument();
  });
});
