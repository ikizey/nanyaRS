import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { Character } from "../types/character";
import Results from "./Results";
import userEvent from "@testing-library/user-event";

const mockCharacters: Character[] = [
  {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBY",
    gender: "male",
    homeworld: "https://swapi.dev/api/planets/1/",
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: "2014-12-09T13:50:51.644000Z",
    edited: "2014-12-20T21:17:56.891000Z",
    url: "https://swapi.dev/api/people/1/",
  },
  {
    name: "Darth Vader",
    height: "202",
    mass: "136",
    hair_color: "none",
    skin_color: "white",
    eye_color: "yellow",
    birth_year: "41.9BBY",
    gender: "male",
    homeworld: "https://swapi.dev/api/planets/1/",
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: "2014-12-10T15:18:20.704000Z",
    edited: "2014-12-20T21:17:50.313000Z",
    url: "https://swapi.dev/api/people/4/",
  },
];

describe("Results", () => {
  it("renders a Luke and Darth characters with relevant data", () => {
    render(<Results results={mockCharacters} />, { wrapper: BrowserRouter });
    const Luke = screen.getByText(mockCharacters[0].name);
    const Father = screen.getByText(mockCharacters[0].name);
    expect(Luke).toBeInTheDocument();
    expect(Father).toBeInTheDocument();
  });

  it("renders the specified number of cards", () => {
    render(<Results results={mockCharacters} />, { wrapper: BrowserRouter });
    const characterList = screen.getAllByRole("listitem");
    expect(characterList).toHaveLength(mockCharacters.length);
  });

  it("displays 'No characters found' when there are no results", () => {
    render(<Results results={[]} />, { wrapper: BrowserRouter });
    expect(screen.getByText("No characters found")).toBeInTheDocument();
  });

  it("clicking on a card opens a detailed card component", async () => {
    const user = userEvent.setup();
    render(<Results results={mockCharacters} />, {
      wrapper: BrowserRouter,
    });

    const characterItem = screen.getByText(mockCharacters[0].name);

    user.click(characterItem);

    await waitFor(() => expect(window.location.pathname).toBe(`/details/1/`));
  });
});
