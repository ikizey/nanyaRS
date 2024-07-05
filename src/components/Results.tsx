import { Component } from "react";
import styles from "./Results.module.css";

interface Result {
  name: string;
  gender: string;
  url: string;
}

interface ResultsProps {
  results: Result[];
}

class Results extends Component<ResultsProps> {
  render() {
    if (this.props.results.length > 0) {
      return (
        <ul className={styles.resultsList}>
          {this.props.results.map((result) => (
            <li className={styles.resultItem} key={result.name}>
              <h4 className={styles.resultHeader}>{result.name}</h4>
              <p className={styles.resultText}>{result.gender}</p>
              <p className={styles.resultText}>{result.url}</p>
            </li>
          ))}
        </ul>
      );
    } else {
      return <div className={styles.noResult}>No characters found</div>;
    }
  }
}

export default Results;
