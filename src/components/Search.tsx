import useSearchTerm from "../hooks/useSearchTerm";
import styles from "./Search.module.css";

export default function Search() {
  const { searchTerm, setOnChange, search } = useSearchTerm();

  return (
    <div className={styles.search}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search for a Star Wars character..."
        value={searchTerm}
        onChange={setOnChange}
      />
      <button className={styles.searchButton} onClick={search}>
        Search
      </button>
    </div>
  );
}
