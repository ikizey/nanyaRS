import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import ErrorFallback from "./components/ErrorFallback.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={ErrorFallback}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
