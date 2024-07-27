import { MemoryRouter } from "react-router-dom";
import { screen, setup } from "../__tests__/setup";
import Router from "./Router";

describe("NotFound", () => {
  it("shows Not Found page for unknown path", () => {
    setup(
      <MemoryRouter initialEntries={["/no-such-path"]}>
        <Router />
      </MemoryRouter>,
    );

    const NotFoundText = screen.getByText(/404 - page not found/i);
    expect(NotFoundText).toBeInTheDocument();
  });
});
