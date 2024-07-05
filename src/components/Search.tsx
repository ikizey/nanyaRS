import { ChangeEvent } from "react";
import useSearchTerm from "../hooks/useSearchTerm";
import styles from "./Search.module.css";

export default function Search({
  onSearch,
}: {
  onSearch: (searchTerm: string) => void;
}) {
  const [searchTerm, setSearchTerm, saveSearchTerm] = useSearchTerm();

  return (
    <div className={styles.search}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search for a Star Wars character..."
        value={searchTerm}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(event.target.value);
        }}
      />
      <button
        className={styles.searchButton}
        onClick={() => {
          const trimmedSearch = searchTerm.trim();
          saveSearchTerm(trimmedSearch);
          onSearch(trimmedSearch);
        }}
      >
        Search
      </button>
    </div>
  );
}
