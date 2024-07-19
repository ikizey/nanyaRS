import { describe, it, expect, vi } from "vitest";
import { setup, screen, waitFor } from "../__tests__/setup";
import Results from "./Results";
import { store } from "../store";
import { unselectAllItems } from "../features/selectedItems/selectedItemsSlice";
import { characters } from "../__tests__/mocks/starWarsAPI";
import { MemoryRouter } from "react-router-dom";

describe("Flyout", () => {
  beforeEach(() => {
    store.dispatch(unselectAllItems());
    global.URL.createObjectURL = vi.fn(() => "blob:http://localhost/test-blob");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderResults = () =>
    setup(
      <MemoryRouter>
        <Results results={characters} />
      </MemoryRouter>,
    );

  it("does not render when no items are selected", () => {
    renderResults();
    const flyout = screen.queryByText(/items? selected/i);
    expect(flyout).not.toBeInTheDocument();
  });

  it("renders when an item is selected", async () => {
    const { user } = renderResults();

    const checkbox = screen.getAllByRole("checkbox")[0];
    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await waitFor(() => {
      expect(screen.getByText(/1 item selected/i)).toBeInTheDocument();
    });
  });

  it("renders correct number of selected items", async () => {
    const { user } = renderResults();

    const checkboxes = screen.getAllByRole("checkbox");
    const firstCheckbox = checkboxes[0];
    await user.click(firstCheckbox);
    expect(firstCheckbox).toBeChecked();

    await waitFor(() => {
      expect(screen.getByText(/1 item selected/i)).toBeInTheDocument();
    });

    const secondCheckbox = checkboxes[1];
    await user.click(secondCheckbox);
    expect(secondCheckbox).toBeChecked();

    await waitFor(() => {
      expect(screen.getByText(/2 items selected/i)).toBeInTheDocument();
    });
  });

  it("unselects all items when 'Unselect all' button is clicked", async () => {
    const { user } = renderResults();

    const checkboxes = screen.getAllByRole("checkbox");

    await user.click(checkboxes[0]);
    await user.click(checkboxes[1]);
    await waitFor(() => {
      expect(screen.getByText(/2 items selected/i)).toBeInTheDocument();
    });

    const unselectAllButton = screen.getByText(/unselect all/i);
    await user.click(unselectAllButton);

    await waitFor(() => {
      expect(screen.queryByText(/items selected/i)).not.toBeInTheDocument();
    });
  });

  it("downloads the selected items as a CSV file", async () => {
    const { user } = renderResults();

    const checkboxes = screen.getAllByRole("checkbox");

    await user.click(checkboxes[0]);
    await user.click(checkboxes[1]);
    await waitFor(() => {
      expect(screen.getByText(/2 items selected/i)).toBeInTheDocument();
    });

    const downloadButton = screen.getByText(/download/i);

    expect(downloadButton).toHaveAttribute("href");
    expect(downloadButton).toHaveAttribute("download", "2_characters.csv");
  });
});
