import { Character } from "../../types/character";
import convertToCsv from "./converToCsv";

function createCsvBlob(content: string) {
  return new Blob([content], { type: "text/csv;charset=utf-8;" });
}

export default function getDownloadUrl(characters: Character[]) {
  const content = convertToCsv(characters);
  const blob = createCsvBlob(content);
  return URL.createObjectURL(blob);
}
