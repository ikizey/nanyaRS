import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import NotFound from "./NotFound";
import ErrorFallback from "../components/ErrorFallback";
import CharacterDetails from "../components/CharacterDetails";

export const routes = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorFallback />,
    children: [
      {
        path: "details/:id",
        element: <CharacterDetails />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routes);
