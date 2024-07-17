import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { unselectAllItems } from "../features/selectedItems/selectedItemsSlice";
import styles from "./Flyout.module.css";

const Flyout = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.selectedItems,
  );

  const handleUnselectAll = () => {
    dispatch(unselectAllItems());
  };

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
      <button>Download</button>
    </div>
  );
};

export default Flyout;
