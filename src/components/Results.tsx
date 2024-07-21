import { useDispatch, useSelector } from "react-redux";
import { Character } from "../types/character";
import { RootState } from "../store";
import getCharacterId from "../lib/character/getCharacterId";
import useDetails from "../hooks/useDetails";
import {
  addItem,
  removeItem,
} from "../features/selectedItems/selectedItemsSlice";
import FlyoutContainer from "./FlyoutContainer";
import styles from "./Results.module.css";

export default function Results({ results }: { results: Character[] }) {
  const dispatch = useDispatch();
  const { selectedItems } = useSelector(
    (state: RootState) => state.selectedItems,
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

  return (
    <>
      <ul className={styles.resultsList}>
        {results?.length > 0 ? (
          results.map((character) => (
            <li
              className={styles.resultItem}
              key={character.name}
              onClick={() => {
                const characterId = getCharacterId(character);
                openDetails(characterId);
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
          ))
        ) : (
          <div className={styles.noResult}>No characters found</div>
        )}
      </ul>
      <FlyoutContainer />
    </>
  );
}
