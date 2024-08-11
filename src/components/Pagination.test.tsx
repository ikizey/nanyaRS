import { setup, screen } from "../__tests__/setup";
import Pagination from "./Pagination";
import mockRouter from "next/router";

describe("Pagination component", () => {
  const maxPage = 2;

  const renderPagination = () => {
    return setup(<Pagination maxPage={maxPage} />);
  };

  it("updates URL query parameter to 'page=2' user clicks on second page button", async () => {
    mockRouter.push("/");
    const { user } = renderPagination();

    await user.click(screen.getByText(maxPage));
    expect(mockRouter.query).toMatchObject({ page: "2" });
  });

  it("renders 2 page buttons when maxPage is 2", async () => {
    renderPagination();

    const pagesButtons = screen.getAllByRole("listitem");
    expect(pagesButtons).toHaveLength(maxPage);
  });
});
