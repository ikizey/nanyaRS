import { Character } from "../types/character";
import styles from "./Results.module.css";
import useDetails from "../hooks/useDetails";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  addItem,
  removeItem,
} from "../features/selectedItems/selectedItemsSlice";

export default function Results({ results }: { results: Character[] }) {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.selectedItems,
  );

  const { openDetails } = useDetails();

  const isSelected = (character: Character) => {
    return selectedItems.some((item) => item.name === character.name);
  };

  const handleCheckboxChange = (character: Character) => {
    if (isSelected(character)) {
      dispatch(removeItem(character.name));
    } else {
      dispatch(addItem(character));
    }
  };

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
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={isSelected(character)}
            onChange={() => handleCheckboxChange(character)}
            onClick={(e) => e.stopPropagation()}
          />
          <h4 className={styles.resultHeader}>{character.name}</h4>
        </li>
      ))}
    </ul>
  ) : (
    <div className={styles.noResult}>No characters found</div>
  );
}
