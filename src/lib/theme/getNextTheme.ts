import { Theme } from "../../types/theme";

export function getNextTheme(currentTheme: Theme) {
  return currentTheme === "light" ? "dark" : "light";
}
