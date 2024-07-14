import React, { useEffect, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";
import useDetails from "../hooks/useDetails";
import Search from "./Search";
import Results from "./Results";
import Loading from "./Loading";
import Pagination from "./Pagination";
import { ResultsLoaderData } from "../loaders/resultsLoader";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const { characters, page } = useLoaderData() as ResultsLoaderData;
  const [isLoading, setIsLoading] = useState(true);
  const { closeDetails } = useDetails();
  const { isDetailsPanelOpen } = useDetails();

  useEffect(() => {
    const waitForCharacters = async () => {
      await Promise.all([characters]);
      setIsLoading(false);
    };

    waitForCharacters();
  }, [characters]);

  return (
    <div className={styles.appContainer} onClick={closeDetails}>
      <section>
        <h2 className={styles.sectionHeader}>
          Search for a Star Wars characters
        </h2>
        <Search
          onChange={() => {
            setIsLoading(true);
          }}
        />
      </section>
      <section className={styles.resultsSection}>
        <h2 className={styles.sectionHeader}>Search Results:</h2>
        {isLoading ? (
          <Loading />
        ) : (
          <React.Suspense fallback={<Loading />}>
            <Await
              resolve={characters}
              children={({ results }) => <Results results={results} />}
            />
          </React.Suspense>
        )}
      </section>

      <footer className={styles.footer}>
        <React.Suspense fallback={<Loading />}>
          <Await
            resolve={characters}
            children={({ maxPage }) =>
              maxPage && !isDetailsPanelOpen ? (
                <Pagination
                  page={page}
                  maxPage={maxPage}
                  onChange={() => {
                    setIsLoading(true);
                  }}
                />
              ) : null
            }
          />
        </React.Suspense>
      </footer>
    </div>
  );
}
