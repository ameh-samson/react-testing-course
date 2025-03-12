import { render, screen } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import List from "../components/List";
import { type Item } from "../utils";

// mock component and make sure it is rendered
vi.mock("../components/ItemCard.tsx", () => {
  return {
    default: () => <article>Item card</article>,
  };
});

describe("List component", () => {
  const mockItems: Item[] = [
    {
      id: "1",
      title: "test item 1",
      description: "content 1",
      category: "urgent",
    },
    {
      id: "2",
      title: "test item 2",
      description: "content 2",
      category: "urgent",
    },
  ];

  const mockOnDelete = vi.fn();

  it("renders the flow board heading", () => {
    render(<List items={mockItems} onDelete={mockOnDelete} />);

    expect(
      screen.getByRole("heading", { level: 2, name: /flow board/i })
    ).toBeInTheDocument();
  });

  it("renders correct number of itemCards", () => {
    render(<List items={mockItems} onDelete={mockOnDelete} />);

    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(2);
  });

  it("renders empty grid when items not provided", () => {
    render(<List items={[]} onDelete={mockOnDelete} />);

    expect(screen.queryAllByRole("article")).toHaveLength(0);
  });
});
