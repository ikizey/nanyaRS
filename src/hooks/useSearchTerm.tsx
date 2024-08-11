"use client";

import { useState, useCallback, ChangeEvent, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

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
  const searchParams = useSearchParams(); // Get search params from next/navigation
  const pathname = usePathname(); // Get pathname from next/navigation
  const searchQuery = searchParams.get("search") || "";

  function setOnChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value.trim());
  }

  function search() {
    saveSearchTerm(searchTerm);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("search", searchTerm);
    router.push(`${pathname}?${newSearchParams.toString()}`);
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
