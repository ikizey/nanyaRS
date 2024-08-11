import Loading from "./Loading";
import { setup, screen } from "../__tests__/setup";

describe("Loading Component", () => {
  function renderLoader() {
    return setup(<Loading />);
  }

  it("renders the default loading text", () => {
    renderLoader();
    const loadingElement = screen.getByRole("status");
    expect(loadingElement).toHaveTextContent("Loading...");
  });
});
