import { Character } from "../../types/character";

function filterDetails(character: Character) {
  const detailsList = [
    "gender",
    "height",
    "mass",
    "hair_color",
    "skin_color",
    "eye_color",
    "birth_year",
    "url",
  ];
  return Object.entries(character).filter(([key]) => detailsList.includes(key));
}

function underscoresToSpaces(str: string) {
  return str.replace("_", " ");
}

function capitalize(str: string) {
  return str.replace(/\b\w/g, (firstLetter) => firstLetter.toUpperCase());
}

export default function getDetails(character: Character) {
  const filtered = filterDetails(character);
  return filtered.map(([key, value]) => {
    const withSpaces = underscoresToSpaces(key);
    const capitalized = capitalize(withSpaces);
    return { key: capitalized, value };
  });
}
