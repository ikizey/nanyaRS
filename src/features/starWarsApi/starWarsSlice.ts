import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Character } from "../../types/character";
export interface CharactersResults {
  count: number;
  results: Character[];
}

export const starWarsApi = createApi({
  reducerPath: "starWarsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/" }),
  endpoints: (builder) => ({
    getCharacterById: builder.query<Character, string>({
      query: (id) => `people/${id}/`,
    }),
    getCharacters: builder.query<CharactersResults, string>({
      query: (search) => `people/${search}`,
    }),
  }),
});
