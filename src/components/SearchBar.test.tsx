import SearchBar from "./SearchBar";
import { vi } from "vitest";
import { characters } from "../__tests__/mocks/starWarsAPI";
import { setup, screen, waitFor } from "../__tests__/setup";

vi.mock("../hooks/useDetails", () => ({
  default: () => ({
    closeDetails: vi.fn(),
    isDetailsPanelOpen: false,
  }),
}));

describe("SearchBar Component", () => {
  it("renders search input and results header", async () => {
    setup(<SearchBar characters={characters} count={2} />);

    await waitFor(() => {
      expect(
        screen.getByText("Search for a Star Wars character"),
      ).toBeInTheDocument();
    });
    expect(screen.getByText("Search Results:")).toBeInTheDocument();
  });

  it("renders Loading component when no characters are provided", () => {
    setup(<SearchBar characters={[]} count={0} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders Results component when characters are provided", () => {
    setup(<SearchBar characters={characters} count={1} />);

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  });
});
