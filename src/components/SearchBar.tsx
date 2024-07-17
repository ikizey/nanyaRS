import { useLocation } from "react-router-dom";
import useDetails from "../hooks/useDetails";
import Search from "./Search";
import Results from "./Results";
import Loading from "./Loading";
import Pagination from "./Pagination";
import styles from "./SearchBar.module.css";
import { starWarsApi } from "../features/starWarsApi/starWarsSlice";

function getMaxPage(count?: number) {
  if (!count) {
    return 1;
  }
  const CHARACTERS_PER_PAGE = 10;
  return Math.ceil(count / CHARACTERS_PER_PAGE);
}

export default function SearchBar() {
  const search = useLocation().search;
  const { data, isLoading } = starWarsApi.useGetCharactersQuery(search);

  const queryParams = new URLSearchParams(search);
  const page = queryParams.get("page") || "1";

  const results = data ? data.results : [];
  const maxPage = getMaxPage(data?.count);

  const { closeDetails } = useDetails();
  const { isDetailsPanelOpen } = useDetails();

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
          <Pagination page={page} maxPage={maxPage} />
        ) : null}
      </footer>
    </div>
  );
}
