import { useState, useEffect, useCallback } from "react";

export default function useSearchTerm() {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("searchTerm") || "",
  );

  const saveSearchTerm = useCallback((searchTerm: string) => {
    localStorage.setItem("searchTerm", searchTerm);
  }, []);

  useEffect(() => {
    return () => {
      saveSearchTerm(searchTerm);
    };
  }, [searchTerm, saveSearchTerm]);

  return [searchTerm, setSearchTerm, saveSearchTerm] as const;
}
