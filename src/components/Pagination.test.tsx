import { BrowserRouter } from "react-router-dom";
import { setup, screen, waitFor } from "../__tests__/setup";
import Pagination from "./Pagination";

describe("Pagination component", () => {
  const maxPage = 2;

  const renderPagination = () => {
    return setup(
      <BrowserRouter>
        <Pagination maxPage={maxPage} />
      </BrowserRouter>,
    );
  };

  it("updates URL query parameter to 'page=2' user clicks on second page button", async () => {
    const { user } = renderPagination();

    await user.click(screen.getByText(maxPage));

    await waitFor(() => expect(window.location.search).toContain("page=2"));
  });

  it("renders 2 page buttons when maxPage is 2", async () => {
    renderPagination();

    const pagesButtons = screen.getAllByRole("listitem");
    expect(pagesButtons).toHaveLength(maxPage);
  });
});
