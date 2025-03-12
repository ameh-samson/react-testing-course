import { render, screen } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import ItemCard from "../components/ItemCard";
import { type Item } from "../utils";
import userEvent from "@testing-library/user-event";

type mockProps = Item & {
  onDelete: (id: string) => void;
};

describe("ItemCard component", () => {
  const mockProps: mockProps = {
    id: "1",
    title: "Test Task",
    description: "Test description",
    category: "urgent",
    onDelete: vi.fn(),
  };

  it("renders card with correct content", () => {
    render(<ItemCard {...mockProps} />);
    expect(screen.getByRole("heading", { name: /test task/i }));
    expect(screen.getByText("Test description")).toBeInTheDocument();
    expect(screen.getByText("urgent")).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", async () => {
    const user = userEvent.setup();
    render(<ItemCard {...mockProps} />);
    const deleteButton = screen.getByRole("button", {
      name: "Delete task : 1",
    });

    await user.click(deleteButton);
    expect(mockProps.onDelete).toHaveBeenCalledWith("1");
  });
});
