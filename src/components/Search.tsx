import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import useSearchTerm from "../hooks/useSearchTerm";
import styles from "./Search.module.css";

export default function Search({ onChange }: { onChange: () => void }) {
  const { searchTerm, setSearchTerm, saveSearchTerm } = useSearchTerm();
  const navigate = useNavigate();

  return (
    <div className={styles.search}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search for a Star Wars character..."
        value={searchTerm}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(event.target.value.trim());
        }}
      />
      <button
        className={styles.searchButton}
        onClick={() => {
          saveSearchTerm(searchTerm);
          onChange();
          navigate(`?search=${searchTerm}`);
        }}
      >
        Search
      </button>
    </div>
  );
}
