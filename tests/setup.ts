import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { mockCharacter, mockCharactersResults } from "./mocks/starWarsAPI";

expect.extend(matchers);

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

global.fetch = vi.fn().mockImplementation((url: string) => {
  if (url.startsWith("https://swapi.dev/api/people/1")) {
    return Promise.resolve({
      json: () => Promise.resolve(mockCharacter),
    });
  } else if (url.startsWith("https://swapi.dev/api/people/")) {
    return Promise.resolve({
      json: () => Promise.resolve(mockCharactersResults),
    });
  }
  return Promise.reject(new Error("Not Found"));
});
