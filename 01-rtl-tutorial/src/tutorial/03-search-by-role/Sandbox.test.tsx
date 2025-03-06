import { render, screen, logRoles } from "@testing-library/react";
import Sandbox from "./Sandbox";

describe("03-search-by-role", () => {
  it("renders nav and navigation links", () => {
    const { container } = render(<Sandbox />);
    logRoles(container);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
  });

  it("renders heading with correct hierarchy", () => {
    render(<Sandbox />);

    expect(screen.getByRole("heading", { name: "Main Heading", level: 1 }));
    expect(screen.getByRole("heading", { name: "Subheading", level: 2 }));
  });

  it("renders image with alt text", () => {
    render(<Sandbox />);
    expect(screen.getByRole("img", { name: "Example" })).toBeInTheDocument();
  });

  it("renders initial buttons", () => {
    render(<Sandbox />);

    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("does not render error button initially", () => {
    render(<Sandbox />);

    expect(
      screen.queryByRole("button", { name: "Error" })
    ).not.toBeInTheDocument();
  });

  it("async button appear after delay", async () => {
    render(<Sandbox />);
    const buttonName = /async button/i;
    expect(
      screen.queryByRole("button", { name: buttonName })
    ).not.toBeInTheDocument();

    const asyncButton = await screen.findByRole(
      "button",
      { name: buttonName },
      { timeout: 4000 }
    );
    expect(asyncButton).toBeInTheDocument();
  });
});
