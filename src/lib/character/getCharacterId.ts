import { Character } from "../../types/character";

export default function getCharacterId(character: Character) {
  return character.url.split("/").filter(Boolean).pop();
}
