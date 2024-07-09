import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "./Search";

describe("Search Component", () => {
  const mockOnChange = vi.fn();
  const placeholderText = "Search for a Star Wars character...";

  test("renders input field", async () => {
    render(<Search onChange={mockOnChange} />, { wrapper: BrowserRouter });

    const searchInput = screen.getByPlaceholderText(placeholderText);
    expect(searchInput).toBeInTheDocument();
  });

  test("renders button", async () => {
    render(<Search onChange={mockOnChange} />, { wrapper: BrowserRouter });

    const searchButton = screen.getByRole("button");
    expect(searchButton).toBeInTheDocument();
  });

  it("saves entered value to local storage on button click", async () => {
    const user = userEvent.setup();
    render(<Search onChange={mockOnChange} />, { wrapper: BrowserRouter });

    const searchInput = screen.getByPlaceholderText(placeholderText);
    const searchButton = screen.getByRole("button");

    const searchTerm = "Skywalker";

    await user.type(searchInput, searchTerm);
    await user.click(searchButton);

    expect(localStorage.getItem("searchTermRS")).toBe(searchTerm);
    expect(mockOnChange).toHaveBeenCalled();
  });

  test("retrieves value 'vader' from local storage upon mounting and set it to input field", async () => {
    const searchTerm = "vader";
    localStorage.setItem("searchTermRS", searchTerm);

    render(<Search onChange={mockOnChange} />, { wrapper: BrowserRouter });
    const searchInput = screen.getByPlaceholderText(placeholderText);
    expect(searchInput).toHaveValue(searchTerm);
  });
});
