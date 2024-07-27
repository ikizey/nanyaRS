import { useLocation, useNavigate } from "react-router-dom";

export default function useDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const isDetailsPanelOpen = location.pathname.startsWith("/details");

  function openDetails(characterId?: string) {
    if (characterId) {
      navigate(`/details/${characterId}/${location.search}`);
    }
  }

  function closeDetails() {
    if (isDetailsPanelOpen) {
      navigate(`/${location.search}`);
    }
  }

  return {
    isDetailsPanelOpen,
    openDetails,
    closeDetails,
  };
}
