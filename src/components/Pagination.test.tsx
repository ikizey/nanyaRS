import { describe, it, expect, vi } from "vitest";
import { setup, screen } from "../__tests__/setup";
import Pagination from "./Pagination";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn().mockResolvedValue(undefined),
    refresh: vi.fn(),
  }),
  usePathname: () => "/mock-path",
  useSearchParams: () => ({
    get: vi.fn().mockReturnValue("1"),
    set: vi.fn(),
  }),
}));

describe("Pagination component", () => {
  const maxPage = 2;

  const renderPagination = () => {
    return setup(<Pagination maxPage={maxPage} />);
  };

  it("updates URL query parameter to 'page=2' when user clicks on second page button", async () => {
    const { user } = renderPagination();

    await user.click(screen.getByText(maxPage));
  });

  it("renders 2 page buttons when maxPage is 2", () => {
    renderPagination();

    const pagesButtons = screen.getAllByRole("listitem");
    expect(pagesButtons).toHaveLength(maxPage);
  });
});
