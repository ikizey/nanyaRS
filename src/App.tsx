import { useCallback, useEffect, useState } from "react";
import Search from "./components/Search";
import Results from "./components/Results";
import TestErrorButton from "./components/TestErrorButton";
import Loading from "./components/Loading";
import useSearchTerm from "./hooks/useSearchTerm";
import { fetchStarWarsCharacters } from "./api/starWarsAPI";
import { Character } from "./types/character";
import styles from "./App.module.css";

export default function App() {
  const [initialSearchTerm] = useSearchTerm();
  const [results, setResults] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFetchResults = useCallback(async (searchTerm: string) => {
    setLoading(true);
    try {
      const results = await fetchStarWarsCharacters(searchTerm);
      setResults(results);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleFetchResults(initialSearchTerm);
  }, [initialSearchTerm, handleFetchResults]);

  return (
    <div className={styles.appContainer}>
      <section>
        <h2 className={styles.sectionHeader}>
          Search for a Star Wars characters
        </h2>
        <Search
          onSearch={(term: string) => {
            handleFetchResults(term);
          }}
        />
      </section>
      <section>
        <h2 className={styles.sectionHeader}>Search Results:</h2>
        {loading ? <Loading /> : <Results results={results} />}
      </section>
      <div className={styles.topRight}>
        <TestErrorButton />
      </div>
    </div>
  );
}
