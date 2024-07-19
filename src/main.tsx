import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./routes/Router.tsx";
import AllProviders from "./components/AllProviders.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AllProviders>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AllProviders>
  </React.StrictMode>,
);
