import { expect, afterEach, beforeAll, afterAll, vi } from "vitest";
import { render, RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import * as matchers from "@testing-library/jest-dom/matchers";
import { server } from "./mocks/server";
import AllProviders from "../components/AllProviders";

expect.extend(matchers);

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn().mockResolvedValue(undefined),
    refresh: vi.fn(),
  }),
  usePathname: () => "/mock-path",
  useSearchParams: () => ({
    get: vi.fn().mockReturnValue(null),
    set: vi.fn(),
  }),
}));

afterEach(() => {
  server.resetHandlers();
});

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

export function setup(jsx: JSX.Element, options: RenderOptions = {}) {
  const user = userEvent.setup();

  return {
    ...render(jsx, {
      wrapper: AllProviders,
      ...options,
    }),
    user,
  };
}

export * from "@testing-library/react";
