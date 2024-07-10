import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorBoundary from "./ErrorBoundary";
import ErrorFallback from "./ErrorFallback";

const ProblemComponent = () => {
  throw new Error("Error thrown by ProblemChild");
};

describe("ErrorBoundary and ErrorFallback integration test", () => {
  it("should display the ErrorFallback component when an error is thrown", () => {
    render(
      <BrowserRouter>
        <ErrorBoundary fallback={ErrorFallback}>
          <ProblemComponent />
        </ErrorBoundary>
      </BrowserRouter>,
    );

    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
    expect(screen.getByText("We're working on fixing it.")).toBeInTheDocument();

    const tryAgainButton = screen.getByText("Try Again");
    expect(tryAgainButton).toBeInTheDocument();
  });
});
