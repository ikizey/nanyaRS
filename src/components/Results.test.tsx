import { describe, it, expect, vi } from "vitest";
import { screen, setup } from "../__tests__/setup";
import { characters } from "../__tests__/mocks/starWarsAPI";
import Results from "./Results";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn((url) => {
      const [pathname, search] = url.split("?");
      window.history.pushState({}, "", `${pathname}?${search}`);
    }),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn().mockResolvedValue(undefined),
    refresh: vi.fn(),
  }),
  usePathname: () => window.location.pathname,
  useSearchParams: () => new URLSearchParams(window.location.search),
}));

describe("Results", () => {
  beforeEach(() => {
    global.URL.createObjectURL = vi.fn(() => "blob:http://localhost/test-blob");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderResults = (results = characters) => {
    return setup(<Results results={results} />);
  };

  it("renders Luke and Darth characters with relevant data", () => {
    renderResults();
    expect(screen.getByText(characters[0].name)).toBeInTheDocument();
    expect(screen.getByText(characters[1].name)).toBeInTheDocument();
  });

  it("renders the specified number of cards", () => {
    renderResults();
    const characterList = screen.getAllByRole("listitem");
    expect(characterList).toHaveLength(characters.length);
  });

  it("displays 'No characters found' when there are no results", () => {
    renderResults([]);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByRole("status").textContent).toContain("No characters");
  });

  it("clicking on a card opens a detailed card component", async () => {
    const { user } = renderResults();

    const characterItem = screen.getByText(characters[0].name);

    await user.click(characterItem);
  });

  it("selects and deselects an item", async () => {
    const { user } = renderResults();

    const checkbox = screen.getAllByRole("checkbox")[0];
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("maintains selection state when navigating away and back", async () => {
    const { user } = renderResults();

    const checkbox = screen.getAllByRole("checkbox")[0];
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    window.history.pushState({}, "Test Page", "/another-page");
    expect(window.location.pathname).toBe("/another-page");

    window.history.back();
    expect(screen.getAllByRole("checkbox")[0]).toBeChecked();
  });
});
