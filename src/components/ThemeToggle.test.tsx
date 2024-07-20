import { setup, screen } from "../__tests__/setup";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle component", () => {
  test("it should render with light theme initially", () => {
    setup(<ThemeToggle />);
    expect(screen.getByRole("button")).toHaveTextContent(/dark mode/i);
  });

  test("on click it should change to dark", async () => {
    const { user } = setup(<ThemeToggle />);
    const button = screen.getByRole("button");
    await user.click(button);
    expect(button).toHaveTextContent(/light mode/i);
  });
});
