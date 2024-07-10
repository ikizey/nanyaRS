import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { mockCharacter, mockCharactersResults } from "./mocks/starWarsAPI";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

global.fetch = vi.fn().mockImplementation((url: URL) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (url.href.includes("https://swapi.dev/api/people/1")) {
        resolve({
          json: () => Promise.resolve(mockCharacter),
        });
      } else if (url.href.startsWith("https://swapi.dev/api/people/")) {
        resolve({
          json: () => Promise.resolve(mockCharactersResults),
        });
      } else {
        resolve(Promise.reject(new Error("Not Found")));
      }
    }, 200); // 200ms delay to simulate network latency
  });
});
