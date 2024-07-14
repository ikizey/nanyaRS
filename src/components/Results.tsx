import { Character } from "../types/character";
import styles from "./Results.module.css";
import useDetails from "../hooks/useDetails";

export default function Results({ results }: { results: Character[] }) {
  const { openDetails } = useDetails();

  return results?.length > 0 ? (
    <ul className={styles.resultsList}>
      {results.map((character) => (
        <li
          className={styles.resultItem}
          key={character.name}
          onClick={() => {
            const id = character.url.split("/").filter(Boolean).pop();
            openDetails(id);
          }}
        >
          <h4 className={styles.resultHeader}>{character.name}</h4>
        </li>
      ))}
    </ul>
  ) : (
    <div className={styles.noResult}>No characters found</div>
  );
}
