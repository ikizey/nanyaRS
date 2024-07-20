import { Routes, Route } from "react-router-dom";
import Root from "./Root";
import NotFound from "./NotFound";
import ErrorFallback from "../components/ErrorFallback";
import CharacterDetails from "../components/CharacterDetails";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Root />} errorElement={<ErrorFallback />}>
        <Route path="details/:characterId" element={<CharacterDetails />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
