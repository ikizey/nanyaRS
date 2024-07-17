import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "./ThemeToggle";
import { ThemeProvider } from "../context/ThemeContext";

describe("ThemeToggle component", () => {
  beforeEach(() => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );
  });

  test("it should render with light theme initially", () => {
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Dark Mode");
  });

  test("on click it should change to dark", async () => {
    const user = userEvent.setup();
    const button = screen.getByRole("button");
    await user.click(button);
    expect(button).toHaveTextContent("Light Mode");
  });
});
