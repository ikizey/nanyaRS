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
    return (
      <ul className={styles.resultsList}>
        {this.props.results.map((result, index) => (
          <li className={styles.resultItem} key={index}>
            <h2 className={styles.resultHeader}>{result.name}</h2>
            <p className={styles.resultText}>{result.gender}</p>
            <p className={styles.resultText}>{result.url}</p>
          </li>
        ))}
      </ul>
    );
  }
}

export default Results;
