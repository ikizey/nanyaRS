import { BrowserRouter } from "react-router-dom";
import { screen, setup } from "../__tests__/setup";
import Search from "./Search";

describe("Search Component", () => {
  const renderSearch = () =>
    setup(
      <BrowserRouter>
        <Search />
      </BrowserRouter>,
    );

  test("renders input field", async () => {
    renderSearch();

    const searchInput = screen.getByRole("textbox", { name: /search/i });
    expect(searchInput).toBeInTheDocument();
  });

  test("renders button", async () => {
    renderSearch();

    const searchButton = screen.getByRole("button");
    expect(searchButton).toBeInTheDocument();
  });

  it("saves entered value to local storage on button click", async () => {
    const { user } = renderSearch();

    const searchInput = screen.getByRole("textbox", { name: /search/i });
    const searchButton = screen.getByRole("button");

    const searchTerm = "Skywalker";
    await user.type(searchInput, searchTerm);
    await user.click(searchButton);

    expect(localStorage.getItem("searchTermRS")).toBe(searchTerm);
  });

  test("retrieves value 'vader' from local storage upon mounting and set it to input field", async () => {
    const searchTerm = "vader";
    localStorage.setItem("searchTermRS", searchTerm);

    renderSearch();

    const searchInput = screen.getByRole("textbox", { name: /search/i });
    expect(searchInput).toHaveValue(searchTerm);
  });
});
