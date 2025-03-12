import { render, screen } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import { FlowProvider } from "../FlowContext";
import App from "../App";

const getFormElements = () => {
  return {
    titleInput: screen.getByRole("textbox", { name: /title/i }),
    descriptionInput: screen.getByRole("textbox", { name: /description/i }),
    categorySelect: screen.getByRole("combobox", { name: /category/i }),
    submitButton: screen.getByRole("button", { name: /add task/i }),
  };
};

const customRenderApp = () => {
  return render(
    <FlowProvider>
      <App />
    </FlowProvider>
  );
};

const addTestItem = async (user: UserEvent) => {
  const { titleInput, descriptionInput, categorySelect, submitButton } =
    getFormElements();
  await user.type(titleInput, "Test Item");
  await user.type(descriptionInput, "Test Content");
  await user.selectOptions(categorySelect, "urgent");
  await user.click(submitButton);
};

describe("App", () => {
  let user: UserEvent;

  beforeEach(() => {
    console.log("Test is running");
    vi.clearAllMocks();
    user = userEvent.setup();
    customRenderApp();
  });

  it("renders heading and form elements", () => {
    const heading = screen.getByRole("heading", {
      level: 1,
      name: /focus flow/i,
    });
    expect(heading).toBeInTheDocument();

    const elements = getFormElements();
    Object.values(elements).forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it("handles adding an item", async () => {
    const cardsBefore = screen.queryAllByRole("article");
    expect(cardsBefore).toHaveLength(0);

    await addTestItem(user);

    const cardsAfter = screen.getAllByRole("article");
    expect(cardsAfter).toHaveLength(1);

    expect(screen.getByText("Test Item")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(screen.getByText("urgent")).toBeInTheDocument();
  });

  it("handles deleting an item", async () => {
    await addTestItem(user);
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();
    await user.click(deleteButton);

    expect(screen.queryByText("Test Item")).not.toBeInTheDocument();
    expect(screen.queryAllByRole("article")).toHaveLength(0);
  });
});
