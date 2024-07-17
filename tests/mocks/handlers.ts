import { http, HttpResponse } from "msw";
import { mockCharacter, mockCharactersResults } from "./starWarsAPI";

export const handlers = [
  http.get("https://swapi.dev/api/people", () => {
    return HttpResponse.json(mockCharactersResults);
  }),

  http.get("https://swapi.dev/api/people/1", () => {
    return HttpResponse.json(mockCharacter);
  }),

  http.get("https://swapi.dev/api/people/12345", () => {
    return HttpResponse.json({ detail: "Not found" });
  }),
];
