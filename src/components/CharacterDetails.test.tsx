import { setup, screen, waitFor } from "../__tests__/setup";
import Router from "../routes/Router";
import { MemoryRouter } from "react-router-dom";

describe("CharacterDetails Component", () => {
  const renderCharacterDetails = (characterId: string = "1") =>
    setup(
      <MemoryRouter
        initialEntries={[`/details/${characterId}/`]}
        initialIndex={1}
      >
        <Router />
      </MemoryRouter>,
    );

  it("displays loading indicator while fetching data", async () => {
    renderCharacterDetails();

    await waitFor(() => {
      const loaders = screen.getAllByText("Loading...");
      expect(loaders.length).toBeGreaterThan(0);
    });
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });
  });

  it("displays detailed info of Luke Skywalker correctly", async () => {
    renderCharacterDetails();

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /Luke Skywalker/i, level: 2 }),
      ).toBeInTheDocument();
      expect(screen.getByText("male")).toBeInTheDocument();
      expect(screen.getByText("172")).toBeInTheDocument();
      expect(screen.getByText("77")).toBeInTheDocument();
      expect(screen.getByText("blond")).toBeInTheDocument();
      expect(screen.getByText("fair")).toBeInTheDocument();
      expect(screen.getByText("blue")).toBeInTheDocument();
      expect(screen.getByText("19BBY")).toBeInTheDocument();
      expect(screen.getByText("Homeworld:")).toBeInTheDocument();
      expect(screen.getByText("URL:")).toBeInTheDocument();
    });
  });

  it('displays "character not found" for non existing character', async () => {
    const nonExistentCharacterId = "12345";
    renderCharacterDetails(nonExistentCharacterId);

    await waitFor(() => {
      expect(screen.getByText("Character not found")).toBeInTheDocument();
    });
  });

  it("hides the component when clicking the close button", async () => {
    const { user } = renderCharacterDetails();

    await waitFor(() => {
      const closeButton = screen.getByText("x");
      expect(closeButton).toBeInTheDocument();
      user.click(closeButton);
    });

    await waitFor(() => {
      expect(window.location.pathname).not.toContain("/details");
      const closeButton = screen.queryByText("x");
      expect(closeButton).toBeNull();
    });
  });
});
