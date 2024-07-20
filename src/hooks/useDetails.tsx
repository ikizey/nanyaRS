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

  function detailsPath(characterId: string) {
    return `/details/${characterId}/${location.search}`;
  }

  function openDetails(characterId?: string) {
    if (characterId) {
      navigate(`${detailsPath(characterId)}`);
    }
  }

  return {
    isDetailsPanelOpen,
    closeDetails,
    detailsPath,
    openDetails,
  };
}
