import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routes } from "../routes/router";

describe("CharacterDetails Component", () => {
  it("displays loading indicator while fetching data", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/details/1/"],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  it("displays detailed info of Luke Skywalker correctly", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/details/1/"],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /Luke Skywalker/i, level: 2 }),
      ).toBeInTheDocument();
      expect(screen.getByText(`male`)).toBeInTheDocument();
      expect(screen.getByText(`172`)).toBeInTheDocument();
      expect(screen.getByText(`77`)).toBeInTheDocument();
      expect(screen.getByText(`blond`)).toBeInTheDocument();
      expect(screen.getByText(`fair`)).toBeInTheDocument();
      expect(screen.getByText(`blue`)).toBeInTheDocument();
      expect(screen.getByText(`19BBY`)).toBeInTheDocument();
      expect(screen.getByText("Homeworld:")).toBeInTheDocument();
      expect(screen.getByText("URL:")).toBeInTheDocument();
    });
  });

  it("hides the component when clicking the close button", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/details/1/"],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      const closeButton = screen.getByText("x");
      expect(closeButton).toBeInTheDocument();
      userEvent.click(closeButton);
    });

    await waitFor(() => {
      expect(window.location.pathname).not.toContain("/details");
      const closeButton = screen.queryByText("x");
      expect(closeButton).toBeNull();
    });
  });
});