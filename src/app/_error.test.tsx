import { screen, setup } from "../__tests__/setup";
import ErrorPage from "../app/error";

describe("ErrorPage Component", () => {
  it("renders error messages correctly", () => {
    setup(<ErrorPage />);

    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
    expect(screen.getByText("We're working on fixing it.")).toBeInTheDocument();
  });

  it("navigates to the homepage when 'Try Again' button is clicked", async () => {
    const { user } = setup(<ErrorPage />);

    const button = screen.getByRole("button", { name: /try again/i });
    await user.click(button);
  });
});
