import { vi, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import useTheme from "./useTheme";

it("should throw error when used outside of ThemeProvider", () => {
  const consoleError = vi.spyOn(console, "error");
  consoleError.mockImplementation(() => {});

  expect(() => {
    renderHook(() => useTheme());
  }).toThrow("useTheme must be used within a ThemeProvider");
  expect(consoleError).toBeCalled();

  consoleError.mockRestore();
});
