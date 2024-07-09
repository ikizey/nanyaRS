import { useLocation, useNavigate } from "react-router-dom";

export default function useDetails() {
  const location = useLocation();
  const isDetailsPanelOpen = location.pathname.startsWith("/details");

  const navigate = useNavigate();

  function closeDetails() {
    if (isDetailsPanelOpen) {
      navigate(`/${location.search}`);
    }
  }

  function detailsPath(id: string) {
    return `/details/${id}/${location.search}`;
  }

  function openDetails(id?: string) {
    if (id) {
      navigate(`${detailsPath(id)}`);
    }
  }

  return {
    isDetailsPanelOpen,
    closeDetails,
    detailsPath,
    openDetails,
  };
}
