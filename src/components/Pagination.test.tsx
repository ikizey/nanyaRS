import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Pagination from "./Pagination";

const maxPage = 2;

describe("Pagination component", () => {
  it("updates URL query parameter to 'page=2' user clicks on second page button", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Pagination page="1" maxPage={maxPage} onChange={handleChange} />, {
      wrapper: BrowserRouter,
    });

    const secondPageButton = screen.getByText("2");

    user.click(secondPageButton);

    await waitFor(() => expect(window.location.search).toContain("page=2"));

    expect(handleChange).toHaveBeenCalled();
  });

  it("renders 2 page buttons when maxPage is 2", async () => {
    const handleChange = vi.fn();

    render(<Pagination page="1" maxPage={maxPage} onChange={handleChange} />, {
      wrapper: BrowserRouter,
    });

    const pagesButtons = screen.getAllByRole("listitem");
    expect(pagesButtons).toHaveLength(maxPage);
  });
});
