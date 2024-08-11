import { useRouter } from "next/router";

function getCurrentQuery(location: string): string {
  return location.includes("?")
    ? location.substring(location.indexOf("?"))
    : "";
}

export default function useDetails() {
  const router = useRouter();
  const location = router.asPath;

  const isDetailsPanelOpen = location.startsWith("/details");

  function openDetails(newCharacterId: string) {
    const currentQuery = getCurrentQuery(location);
    router.push(`/details/${newCharacterId}${currentQuery}`);
  }

  function closeDetails() {
    if (isDetailsPanelOpen) {
      const currentQuery = getCurrentQuery(location);
      router.push(`/${currentQuery}`);
    }
  }

  return {
    isDetailsPanelOpen,
    openDetails,
    closeDetails,
  };
}
