import { Character } from "../../types/character";

export default function convertToCsv(characters: Character[]) {
  const COLUMN_SEPARATOR = ",";
  const RECORD_SEPARATOR = "\n";
  const HEADERS = ["name", "gender", "birth year", "eye color", "url"];

  const rowsData = characters.map((character) => [
    character.name,
    character.gender,
    character.birth_year,
    character.eye_color,
    character.url,
  ]);

  const headersAndData = [HEADERS, ...rowsData];
  const csvContent = headersAndData
    .map((row) => row.join(COLUMN_SEPARATOR))
    .join(RECORD_SEPARATOR);

  return csvContent;
}
