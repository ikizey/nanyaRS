import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { setup, screen } from "../__tests__/setup";
import { characters } from "../__tests__/mocks/starWarsAPI";
import { store } from "../store";
import { unselectAllItems } from "../features/selectedItems/selectedItemsSlice";
import Results from "./Results";

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

    expect(screen.queryByText(/items? selected/i)).not.toBeInTheDocument();
  });

  it('renders "1 item selected" when an item is selected', async () => {
    const { user } = renderResults();

    const checkbox = screen.getAllByRole("checkbox")[0];
    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    expect(screen.getByText(/1 item selected/i)).toBeInTheDocument();
  });

  it("renders correct number of selected items", async () => {
    const { user } = renderResults();

    const checkboxes = screen.getAllByRole("checkbox");
    const firstCheckbox = checkboxes[0];
    await user.click(firstCheckbox);
    expect(firstCheckbox).toBeChecked();

    expect(screen.getByText(/1 item selected/i)).toBeInTheDocument();

    const secondCheckbox = checkboxes[1];
    await user.click(secondCheckbox);
    expect(secondCheckbox).toBeChecked();

    expect(screen.getByText(/2 items selected/i)).toBeInTheDocument();
  });

  it('deselects all items when "Deselect all" button is clicked', async () => {
    const { user } = renderResults();

    const checkboxes = screen.getAllByRole("checkbox");

    await user.click(checkboxes[0]);
    await user.click(checkboxes[1]);
    expect(screen.getByText(/2 items selected/i)).toBeInTheDocument();

    const deselectAllButton = screen.getByRole("button", {
      name: /deselect all/i,
    });
    await user.click(deselectAllButton);

    expect(screen.queryByText(/items selected/i)).not.toBeInTheDocument();
  });

  it("downloads button points to correct csv file", async () => {
    const { user } = renderResults();

    const checkboxes = screen.getAllByRole("checkbox");

    await user.click(checkboxes[0]);
    await user.click(checkboxes[1]);
    expect(screen.getByText(/2 items selected/i)).toBeInTheDocument();

    const downloadButton = screen.getByRole("button", { name: /download/i });

    expect(downloadButton).toHaveAttribute("href");
    expect(downloadButton).toHaveAttribute("download", "2_characters.csv");
  });
});
