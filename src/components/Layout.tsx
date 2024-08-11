import React from "react";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";
import { Character } from "../types/character";
import styles from "./Layout.module.css";

interface LayoutProps {
  children?: React.ReactNode;
  characters: Character[];
  count: number;
}

export default function Layout({ children, characters, count }: LayoutProps) {
  return (
    <div className={styles.container}>
      <ThemeToggle />
      <div className={styles.searchBar}>
        <SearchBar characters={characters} count={count} />
      </div>
      {children && <div className={styles.details}>{children}</div>}
    </div>
  );
}
