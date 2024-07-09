import { LoaderFunctionArgs, defer } from "react-router-dom";
import { Character } from "../types/character";
import { fetchStarWarsCharacter } from "../api/starWarsAPI";

export interface CharacterLoaderData {
  character: Promise<Character[]>;
  characterId: string;
}

export async function loader(fnArgs: LoaderFunctionArgs) {
  const character = fetchStarWarsCharacter(fnArgs);
  const characterId = fnArgs.params.id;
  return defer({ character, characterId });
}
