import { Routes, Route } from "react-router-dom";
import Index from "./Index";
import NotFoundPage from "./NotFoundPage";
import ControlledForm from "./ControlledForm";
import UnControlledForm from "./UnControlledForm";
import ErrorPage from "./ErrorPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Index />} errorElement={<ErrorPage />} />
      <Route path="/uncontrolled" element={<UnControlledForm />} />
      <Route path="/controlled" element={<ControlledForm />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
