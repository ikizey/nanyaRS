import { useLocation } from "react-router-dom";
import useDetails from "../hooks/useDetails";
import { starWarsApi } from "../features/starWarsApi/starWarsSlice";
import Loading from "./Loading";
import Pagination from "./Pagination";
import Results from "./Results";
import Search from "./Search";
import styles from "./SearchBar.module.css";

function getMaxPage(count: number = 1) {
  const CHARACTERS_PER_PAGE = 10;
  return Math.ceil(count / CHARACTERS_PER_PAGE);
}

export default function SearchBar() {
  const search = useLocation().search;
  const { data, isLoading } = starWarsApi.useGetCharactersQuery(search);

  const results = data?.results || [];
  const maxPage = getMaxPage(data?.count || 1);

  const { closeDetails, isDetailsPanelOpen } = useDetails();

  return (
    <div className={styles.appContainer} onClick={closeDetails}>
      <section>
        <h2 className={styles.sectionHeader}>
          Search for a Star Wars characters
        </h2>
        <Search />
      </section>
      <section className={styles.resultsSection}>
        <h2 className={styles.sectionHeader}>Search Results:</h2>
        {isLoading ? <Loading /> : <Results results={results} />}
      </section>

      <footer className={styles.footer}>
        {maxPage && !isDetailsPanelOpen ? (
          <Pagination maxPage={maxPage} />
        ) : null}
      </footer>
    </div>
  );
}
