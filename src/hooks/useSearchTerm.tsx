import { useState, useCallback, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/router";

export default function useSearchTerm() {
  const LSSearchKeyName = "searchTermRS";

  function loadSearchTerm() {
    if (typeof window !== "undefined") {
      return localStorage.getItem(LSSearchKeyName) || "";
    }
    return "";
  }

  const [searchTerm, setSearchTerm] = useState(loadSearchTerm);
  const [firstRender, setFirstRender] = useState(true);

  const saveSearchTerm = useCallback((searchTerm: string) => {
    localStorage.setItem(LSSearchKeyName, searchTerm);
  }, []);

  const router = useRouter();
  const query = router.query as Record<string, string>;
  const urlSearchParams = new URLSearchParams(query);
  const searchQuery = urlSearchParams.get("search") || "";
  const pathname = router.pathname;

  function setOnChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value.trim());
  }

  function search() {
    saveSearchTerm(searchTerm);
    router.push(`${pathname}?search=${searchTerm}`);
  }

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      if (searchQuery) {
        setSearchTerm(searchQuery);
      }
    }
  }, [searchQuery, firstRender]);

  return {
    searchTerm,
    setOnChange,
    search,
  };
}
