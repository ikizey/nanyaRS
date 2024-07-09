import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import * as mockStarWarsAPI from "./mocks/starWarsAPI";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

vi.mock("../src/api/starWarsAPI", () => ({
  fetchStarWarsCharacters: mockStarWarsAPI.fetchStarWarsCharacters,
  fetchStarWarsCharacter: mockStarWarsAPI.fetchStarWarsCharacter,
}));
