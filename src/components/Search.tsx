import { Component, ChangeEvent } from "react";
import styles from "./Search.module.css";

interface SearchProps {
  onSearch: (term: string) => void;
}

interface SearchState {
  searchTerm: string;
}

class Search extends Component<SearchProps, SearchState> {
  state: SearchState = {
    searchTerm: localStorage.getItem("searchTerm") || "",
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    const term = this.state.searchTerm.trim();
    localStorage.setItem("searchTerm", term);
    this.props.onSearch(term);
  };

  render() {
    return (
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search for a Star Wars character..."
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default Search;
