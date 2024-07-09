import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function useSearchTerm() {
  const LSSearchKeyName = "searchTermRS";
  const loadSearchTerm = useCallback(() => {
    return localStorage.getItem(LSSearchKeyName) || "";
  }, []);

  const saveSearchTerm = useCallback((searchTerm: string) => {
    localStorage.setItem(LSSearchKeyName, searchTerm);
  }, []);

  const [searchTerm, setSearchTerm] = useState(loadSearchTerm);
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      if (searchTerm) {
        navigate(`${pathname}?search=${searchTerm}`);
      }
    }
    return () => {
      saveSearchTerm(searchTerm);
    };
  }, [saveSearchTerm, searchTerm, pathname, navigate, firstRender]);

  return {
    searchTerm,
    setSearchTerm,
    loadSearchTerm,
    saveSearchTerm,
  };
}
