import { LoaderFunctionArgs } from "react-router-dom";
import { Character } from "../types/character";
import getSearchParams from "./getSearchParams";

interface CharactersResults {
  count: number;
  results: Character[];
}

function getURL() {
  return new URL("https://swapi.dev/api/people/");
}

function getUrlWithSearchParams({ request }: LoaderFunctionArgs) {
  const url = getURL();
  const searchParams = getSearchParams(request);
  url.search = searchParams.toString();
  return url;
}

function getMaxPage(count: number) {
  const CHARACTERS_PER_PAGE = 10;
  return Math.ceil(count / CHARACTERS_PER_PAGE);
}

export async function fetchStarWarsCharacters(fnArgs: LoaderFunctionArgs) {
  const url = getUrlWithSearchParams(fnArgs);
  const response = await fetch(url);
  const { results, count }: CharactersResults = await response.json();
  const maxPage = getMaxPage(count);
  return { results, maxPage };
}
