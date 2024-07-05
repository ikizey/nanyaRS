import { Character } from "../types/character";
import styles from "./Results.module.css";

export default function Results({ results }: { results: Character[] }) {
  return results.length > 0 ? (
    <ul className={styles.resultsList}>
      {results.map((result) => (
        <li className={styles.resultItem} key={result.name}>
          <h4 className={styles.resultHeader}>{result.name}</h4>
          <p className={styles.resultText}>{result.gender}</p>
          <p className={styles.resultText}>{result.url}</p>
        </li>
      ))}
    </ul>
  ) : (
    <div className={styles.noResult}>No characters found</div>
  );
}
