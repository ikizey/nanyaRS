import { http, HttpResponse } from "msw";
import { Luke, charactersResults } from "./starWarsAPI";

export const handlers = [
  http.get("https://swapi.dev/api/people", () => {
    return HttpResponse.json(charactersResults);
  }),

  http.get("https://swapi.dev/api/people/1", () => {
    return HttpResponse.json(Luke);
  }),

  http.get("https://swapi.dev/api/people/12345", () => {
    return HttpResponse.json({ detail: "Not found" });
  }),
];
