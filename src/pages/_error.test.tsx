import { screen, setup } from "../__tests__/setup";
import ErrorPage from "../pages/_error";
import mockRouter from "next-router-mock";

describe("ErrorPage Component", () => {
  beforeEach(() => {
    mockRouter.push("/error");
  });

  it("renders error messages correctly", () => {
    setup(<ErrorPage />);

    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
    expect(screen.getByText("We're working on fixing it.")).toBeInTheDocument();
  });

  it("navigates to the homepage when 'Try Again' button is clicked", async () => {
    const { user } = setup(<ErrorPage />);

    const button = screen.getByRole("button", { name: /try again/i });
    await user.click(button);

    expect(mockRouter.asPath).toBe("/");
  });
});
