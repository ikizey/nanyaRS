import { LoaderFunctionArgs, defer } from "react-router-dom";
import getSearchParams from "../api/getSearchParams";
import { fetchStarWarsCharacters } from "../api/starWarsAPI";
import { Character } from "../types/character";

export interface ResultsLoaderData {
  characters: Promise<{
    results: Character[];
    maxPage: number;
  }>;
  searchTerm: string;
  page: string;
}

export async function loader(fnArgs: LoaderFunctionArgs) {
  const characters = fetchStarWarsCharacters(fnArgs);
  const { search, page = "1" } = Object.fromEntries(
    getSearchParams(fnArgs.request),
  );

  return defer({ characters, search, page });
}
