import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Character } from "../../types/character";

export const starWarsApi = createApi({
  reducerPath: "starWarsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/" }),
  endpoints: (builder) => ({
    getCharacterById: builder.query<Character, string>({
      query: (id) => `people/${id}/`,
    }),
  }),
});
