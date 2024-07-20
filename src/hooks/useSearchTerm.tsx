import { useState, useEffect, useCallback, ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function useSearchTerm() {
  const LSSearchKeyName = "searchTermRS";
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem(LSSearchKeyName) || "",
  );
  const [firstRender, setFirstRender] = useState(true);

  const saveSearchTerm = useCallback((searchTerm: string) => {
    localStorage.setItem(LSSearchKeyName, searchTerm);
  }, []);

  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  function setOnChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value.trim());
  }

  function search() {
    saveSearchTerm(searchTerm);
    navigate(`${pathname}?search=${searchTerm}`);
  }

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
    setOnChange,
    search,
  };
}
