import { render, screen } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import Form from "../components/Form";
import { userEvent, type UserEvent } from "@testing-library/user-event";

const getFormElements = () => {
  return {
    titleInput: screen.getByRole("textbox", { name: /title/i }),
    descriptionInput: screen.getByRole("textbox", { name: /description/i }),
    categorySelect: screen.getByRole("combobox", { name: /category/i }),
    submitButton: screen.getByRole("button", { name: /add task/i }),
  };
};

describe("Form Component", () => {
  let user: UserEvent;

  const mockOnSubmit = vi.fn();
  beforeEach(() => {
    user = userEvent.setup();
    mockOnSubmit.mockClear();
    render(<Form onSubmit={mockOnSubmit} />);
  });

  it("renders form with empty fields intially", () => {
    const { titleInput, descriptionInput, categorySelect } = getFormElements();

    expect(titleInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
    expect(categorySelect).toHaveValue("");
  });

  it("submit for with entered values", async () => {
    const { titleInput, descriptionInput, categorySelect, submitButton } =
      getFormElements();

    await user.type(titleInput, "New Task");
    await user.type(descriptionInput, "Task Description");
    await user.selectOptions(categorySelect, "urgent");
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: "New Task",
      description: "Task Description",
      category: "urgent",
    });
  });

  it("validate required fields", async () => {
    const { submitButton } = getFormElements();
    await user.click(submitButton);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("clear form after successful submission", async () => {
    const { titleInput, descriptionInput, categorySelect, submitButton } =
      getFormElements();

    await user.type(titleInput, "New Task");
    await user.type(descriptionInput, "Task Description");
    await user.selectOptions(categorySelect, "urgent");
    await user.click(submitButton);

    expect(titleInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
    expect(categorySelect).toHaveValue("");
  });
});
