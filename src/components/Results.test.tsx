import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { screen, setup, waitFor } from "../__tests__/setup";
import { characters } from "../__tests__/mocks/starWarsAPI";
import Results from "./Results";

describe("Results", () => {
  beforeEach(() => {
    global.URL.createObjectURL = vi.fn(() => "blob:http://localhost/test-blob");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderResults = (results = characters) => {
    return setup(
      <BrowserRouter>
        <Results results={results} />
      </BrowserRouter>,
    );
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
    expect(screen.getByText("No characters found")).toBeInTheDocument();
  });

  it("clicking on a card opens a detailed card component", async () => {
    const { user } = renderResults();

    const characterItem = screen.getByText(characters[0].name);

    user.click(characterItem);

    await waitFor(() => expect(window.location.pathname).toBe(`/details/1/`));
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
    await waitFor(() => {
      expect(window.location.pathname).toBe("/another-page");
    });
    window.history.back();

    const sameCheckbox = screen.getAllByRole("checkbox")[0];
    expect(sameCheckbox).toBeChecked();
  });
});
