import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import NotFound from "./NotFound";
import ErrorFallback from "../components/ErrorFallback";
import CharacterDetails from "../components/CharacterDetails";
import { loader as searchLoader } from "../loaders/resultsLoader";
import { loader as characterDetailsLoader } from "../loaders/characterDetailsLoader";

export const routes = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorFallback />,
    loader: searchLoader,
    children: [
      {
        path: "details/:id",
        element: <CharacterDetails />,
        loader: characterDetailsLoader,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routes);
