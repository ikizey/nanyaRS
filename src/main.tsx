import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import ErrorFallback from "./components/ErrorFallback.tsx";
import { router } from "./routes/router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={ErrorFallback}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>,
);
