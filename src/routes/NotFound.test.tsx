import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routes } from "./router";

describe("NotFound", () => {
  it("shows Not Found page for unknown path", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/no-such-path/"],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    const NotFoundText = screen.getByText(/404 - Page Not Found/i);
    expect(NotFoundText).toBeInTheDocument();
  });
});
