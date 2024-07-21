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

  const searchElement = () => screen.getByRole("textbox", { name: /search/i });
  const searchButton = () => screen.getByRole("button", { name: /search/i });
  const searchTerm = "Skywalker";

  it("renders input field", async () => {
    renderSearch();

    expect(searchElement()).toBeInTheDocument();
  });

  it("renders button", async () => {
    renderSearch();

    expect(searchButton()).toBeInTheDocument();
  });

  it("saves entered value to local storage on button click", async () => {
    const { user } = renderSearch();

    await user.type(searchElement(), searchTerm);
    await user.click(searchButton());

    expect(localStorage.getItem("searchTermRS")).toBe(searchTerm);
  });

  it("retrieves value 'vader' from local storage upon mounting and set it to input field", async () => {
    localStorage.setItem("searchTermRS", searchTerm);

    renderSearch();

    expect(searchElement()).toHaveValue(searchTerm);
  });
});
