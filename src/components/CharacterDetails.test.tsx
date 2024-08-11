import { setup, screen, waitFor } from "../__tests__/setup";
import CharacterDetails from "./CharacterDetails";
import { Luke } from "../__tests__/mocks/starWarsAPI";

describe("CharacterDetails Component", () => {
  function renderCharacterDetails() {
    return setup(<CharacterDetails character={Luke} />);
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

  it("hides the component when clicking the close button", async () => {
    const { user } = renderCharacterDetails();

    await waitFor(() => {
      const closeButton = screen.getByRole("button", { name: "x" });
      expect(closeButton).toBeInTheDocument();
      user.click(closeButton);
    });
  });
});
