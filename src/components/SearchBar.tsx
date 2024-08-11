"use client";

import useDetails from "../hooks/useDetails";
import Loading from "./Loading";
import Pagination from "./Pagination";
import Results from "./Results";
import styles from "./SearchBar.module.css";
import { Character } from "../types/character";
import Search from "./Search";

function getMaxPage(count: number = 1) {
  const CHARACTERS_PER_PAGE = 10;
  return Math.ceil(count / CHARACTERS_PER_PAGE);
}

interface SearchBarProps {
  characters: Character[];
  count: number;
}

export default function SearchBar({ characters, count }: SearchBarProps) {
  const { closeDetails, isDetailsPanelOpen } = useDetails();
  const maxPage = getMaxPage(count);

  return (
    <div className={styles.appContainer} onClick={closeDetails}>
      <section>
        <h2 className={styles.sectionHeader}>
          Search for a Star Wars character
        </h2>
        <Search />
      </section>
      <section className={styles.resultsSection}>
        <h2 className={styles.sectionHeader}>Search Results:</h2>
        {characters.length === 0 ? (
          <Loading />
        ) : (
          <Results results={characters} />
        )}
      </section>

      <footer className={styles.footer}>
        {maxPage && !isDetailsPanelOpen ? (
          <Pagination maxPage={maxPage} />
        ) : null}
      </footer>
    </div>
  );
}
