import { useDispatch, useSelector } from "react-redux";
import getDownloadUrl from "../lib/character/getDownloadUrl";
import { RootState } from "../store";
import { unselectAllItems } from "../features/selectedItems/selectedItemsSlice";
import Flyout from "./Flyout";

export default function FlyoutContainer() {
  const { selectedItems } = useSelector(
    (state: RootState) => state.selectedItems,
  );
  const dispatch = useDispatch();

  const itemsCount = selectedItems.length;

  if (itemsCount === 0) {
    return null;
  }

  return (
    <Flyout
      itemsCount={itemsCount}
      downloadUrl={getDownloadUrl(selectedItems)}
      onDeselectAll={() => dispatch(unselectAllItems())}
    />
  );
}
