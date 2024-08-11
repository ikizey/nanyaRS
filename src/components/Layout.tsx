import React from "react";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";
import { Character } from "../types/character";
import styles from "./Layout.module.css";

interface LayoutProps {
  children?: React.ReactNode;
  searchParams: Record<string, string>;
}

interface CharactersResults {
  count: number;
  results: Character[];
}

async function getCharacters(searchParams: URLSearchParams) {
  const res = await fetch(`https://swapi.dev/api/people/?${searchParams}`);
  const data: CharactersResults = await res.json();
  return data;
}

export default async function Layout({ children, searchParams }: LayoutProps) {
  const urlSearchParams = new URLSearchParams(searchParams);
  const data = await getCharacters(urlSearchParams);

  return (
    <div className={styles.container}>
      <ThemeToggle />
      <div className={styles.searchBar}>
        <SearchBar characters={data.results} count={data.count} />
      </div>
      {children && <div className={styles.details}>{children}</div>}
    </div>
  );
}
