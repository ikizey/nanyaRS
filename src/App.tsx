import { Component } from "react";
import Search from "./components/Search";
import Results from "./components/Results";
import TestErrorButton from "./components/TestErrorButton";
import { fetchStarWarsCharacters } from "./api/starWarsAPI";
import { Character } from "./types/character";
import Loading from "./components/Loading";
import styles from "./App.module.css";

interface AppState {
  results: Character[];
  loading: boolean;
}

class App extends Component {
  state: AppState = {
    results: [],
    loading: false,
  };

  componentDidMount() {
    this.handleFetchResults(localStorage.getItem("searchTerm") || "");
  }

  handleFetchResults = async (searchTerm: string) => {
    this.setState({ loading: true });
    try {
      const results = await fetchStarWarsCharacters(searchTerm);
      this.setState({ results, loading: false });
    } catch (error) {
      console.error("API Error:", error);
      this.setState({ loading: false });
    }
  };

  handleSearch = (term: string) => {
    this.handleFetchResults(term);
  };

  render() {
    return (
      <div className={styles.appContainer}>
        <section>
          <h2 className={styles.sectionHeader}>
            Search for a Star Wars characters
          </h2>
          <Search onSearch={this.handleSearch} />
        </section>
        <section>
          <h2 className={styles.sectionHeader}>Search Results:</h2>
          {this.state.loading ? (
            <Loading />
          ) : (
            <Results results={this.state.results} />
          )}
        </section>
        <div className={styles.topRight}>
          <TestErrorButton />
        </div>
      </div>
    );
  }
}

export default App;
