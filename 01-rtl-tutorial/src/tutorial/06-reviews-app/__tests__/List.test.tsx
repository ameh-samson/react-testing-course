import { render, screen } from "@testing-library/react";
import List from "../List";
import { Review } from "../Sandbox";

const mockReviews: Review[] = [
  { email: "test@example.com", rating: "4", text: "Great product!" },
  { email: "user@example.com", rating: "4", text: "Excellent service!" },
];

describe("List Component", () => {
  it("should render heading", () => {
    render(<List reviews={[]} />);


    expect(
      screen.getByRole("heading", { level: 2, name: /reviews/i })
    ).toBeInTheDocument();
  });

  it('displays "No reviews yet" when reviews array is empty', () => {
    render(<List reviews={[]} />);

    expect(screen.getByText(/no reviews yet/i)).toBeInTheDocument();
  });

  it("renders review correctly", () => {
    render(<List reviews={mockReviews} />);

    mockReviews.forEach((review) => {
      expect(screen.getByText(review.email)).toBeInTheDocument();
      expect(screen.getByText(review.text)).toBeInTheDocument();
      const stars = "⭐".repeat(Number(review.rating));

      screen.getAllByText(stars).forEach((star) => {
        expect(star).toBeInTheDocument();
      });
    });
  });
});
