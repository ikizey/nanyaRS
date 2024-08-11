import { setup, screen, waitFor } from "../../__tests__/setup";
import mockRouter from "next/router";
import CharacterDetailsRoute from "./[characterId]";
import { characters, Luke } from "../../__tests__/mocks/starWarsAPI";

describe("CharacterDetails Component", () => {
  function renderCharacterDetails(characterId: string = "1") {
    mockRouter.push(`/details/${characterId}`);
    if (characterId === "1") {
      return setup(
        <CharacterDetailsRoute
          character={Luke}
          characters={characters}
          count={characters.length}
        />,
      );
    } else {
      return setup(
        <CharacterDetailsRoute
          character={null}
          characters={characters}
          count={characters.length}
        />,
      );
    }
  }

  it("displays detailed info of Luke Skywalker correctly", async () => {
    renderCharacterDetails();

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /luke skywalker/i, level: 2 }),
      ).toBeInTheDocument();
    });
    expect(screen.getByText("male")).toBeInTheDocument();
    expect(screen.getByText("172")).toBeInTheDocument();
    expect(screen.getByText("77")).toBeInTheDocument();
    expect(screen.getByText("blond")).toBeInTheDocument();
    expect(screen.getByText("fair")).toBeInTheDocument();
    expect(screen.getByText("blue")).toBeInTheDocument();
    expect(screen.getByText("19BBY")).toBeInTheDocument();
    expect(screen.getByText("Url:")).toBeInTheDocument();
  });

  it('displays "character not found" for non existing character', async () => {
    const nonExistentCharacterId = "12345";
    renderCharacterDetails(nonExistentCharacterId);

    expect(await screen.findByText(/character not found/i)).toBeInTheDocument();
  });

  it("hides the component when clicking the close button", async () => {
    const { user } = renderCharacterDetails();

    await waitFor(() => {
      const closeButton = screen.getByRole("button", { name: "x" });
      expect(closeButton).toBeInTheDocument();
      user.click(closeButton);
    });

    await waitFor(() => {
      expect(mockRouter.pathname).not.toContain("/details");
    });
  });
});
