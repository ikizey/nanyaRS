import { screen, setup } from "../__tests__/setup";
import mockRouter from "next/router";
import Custom404Page from "../pages/404";

describe("Custom 404 Page", () => {
  it("displays the 404 page when navigating to an unknown route", () => {
    mockRouter.push("/non-existent-route");

    setup(<Custom404Page />);

    const notFoundText = screen.getByText(/404 - page not found/i);
    expect(notFoundText).toBeInTheDocument();
  });
});
