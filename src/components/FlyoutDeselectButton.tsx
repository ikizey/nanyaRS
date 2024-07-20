import { useDispatch } from "react-redux";
import { unselectAllItems } from "../features/selectedItems/selectedItemsSlice";

export default function FlyoutDeselectButton() {
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch(unselectAllItems())}>Deselect all</button>
  );
}
