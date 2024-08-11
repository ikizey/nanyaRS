import { screen, setup } from "../__tests__/setup";
import Custom404Page from "../app/not-found";

describe("Custom 404 Page", () => {
  it("displays the 404 page when navigating to an unknown route", () => {
    setup(<Custom404Page />);

    const notFoundText = screen.getByText(/404 - page not found/i);
    expect(notFoundText).toBeInTheDocument();
  });
});
