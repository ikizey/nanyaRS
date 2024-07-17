import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { Character } from "../types/character";
import Results from "./Results";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../store";
import { ThemeProvider } from "../context/ThemeContext";
import { unselectAllItems } from "../features/selectedItems/selectedItemsSlice";

const mockCharacters: Character[] = [
  {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBY",
    gender: "male",
    homeworld: "https://swapi.dev/api/planets/1/",
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: "2014-12-09T13:50:51.644000Z",
    edited: "2014-12-20T21:17:56.891000Z",
    url: "https://swapi.dev/api/people/1/",
  },
  {
    name: "Darth Vader",
    height: "202",
    mass: "136",
    hair_color: "none",
    skin_color: "white",
    eye_color: "yellow",
    birth_year: "41.9BBY",
    gender: "male",
    homeworld: "https://swapi.dev/api/planets/1/",
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: "2014-12-10T15:18:20.704000Z",
    edited: "2014-12-20T21:17:50.313000Z",
    url: "https://swapi.dev/api/people/4/",
  },
];

describe("Flyout", () => {
  beforeEach(() => {
    store.dispatch(unselectAllItems());
  });

  const setup = () => {
    return render(
      <Provider store={store}>
        <ThemeProvider>
          <BrowserRouter>
            <Results results={mockCharacters} />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    );
  };

  it("does not render when no items are selected", () => {
    setup();
    const flyout = screen.queryByText(/items? selected/i);
    expect(flyout).not.toBeInTheDocument();
  });

  it("renders when an item is selected", async () => {
    const user = userEvent.setup();
    setup();

    const checkbox = screen.getAllByRole("checkbox")[0];
    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await waitFor(() => {
      expect(screen.getByText(/1 item selected/i)).toBeInTheDocument();
    });
  });

  it("renders correct number of selected items", async () => {
    const user = userEvent.setup();
    setup();

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
    const user = userEvent.setup();
    setup();

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
});
