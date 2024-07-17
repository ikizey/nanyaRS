import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { unselectAllItems } from "../features/selectedItems/selectedItemsSlice";
import { Character } from "../types/character";
import styles from "./Flyout.module.css";

const convertToCSV = (items: Character[]) => {
  const COLUMN_SEPARATOR = ",";
  const RECORD_SEPARATOR = "\n";
  const headers = ["name", "gender", "birth year", "eye color", "url"];
  const rows = items.map((item) => [
    item.name,
    item.gender,
    item.birth_year,
    item.eye_color,
    item.url,
  ]);
  const csvContent = [headers, ...rows]
    .map((row) => row.join(COLUMN_SEPARATOR))
    .join(RECORD_SEPARATOR);

  return csvContent;
};

const Flyout = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.selectedItems,
  );

  const handleUnselectAll = () => {
    dispatch(unselectAllItems());
  };

  function getDownloadUrl() {
    const csvContent = convertToCSV(selectedItems);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    return url;
  }

  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <div className={styles.flyout}>
      <p>
        {selectedItems.length}
        {selectedItems.length === 1 ? " item " : " items "}
        selected
      </p>
      <button onClick={handleUnselectAll}>Unselect all</button>
      <a
        href={getDownloadUrl()}
        download={`${selectedItems.length}_characters.csv`}
        className={styles.downloadButton}
      >
        Download
      </a>
    </div>
  );
};

export default Flyout;
