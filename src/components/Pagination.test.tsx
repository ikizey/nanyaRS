import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "./Pagination";

const maxPage = 2;

describe("Pagination component", () => {
  it("updates URL query parameter to 'page=2' user clicks on second page button", async () => {
    const user = userEvent.setup();

    render(<Pagination page="1" maxPage={maxPage} />, {
      wrapper: BrowserRouter,
    });

    const secondPageButton = screen.getByText("2");

    user.click(secondPageButton);

    await waitFor(() => expect(window.location.search).toContain("page=2"));
  });

  it("renders 2 page buttons when maxPage is 2", async () => {
    render(<Pagination page="1" maxPage={maxPage} />, {
      wrapper: BrowserRouter,
    });

    const pagesButtons = screen.getAllByRole("listitem");
    expect(pagesButtons).toHaveLength(maxPage);
  });
});
