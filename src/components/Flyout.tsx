import { useSelector } from "react-redux";
import { RootState } from "../store";
import FlyoutText from "./FlyoutText";
import FlyoutDeselectButton from "./FlyoutDeselectButton";
import FlyoutDownloadButton from "./FlyoutDownloadButton";
import styles from "./Flyout.module.css";

export default function Flyout() {
  const { selectedItems } = useSelector(
    (state: RootState) => state.selectedItems,
  );

  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <div className={styles.flyout}>
      <FlyoutText length={selectedItems.length} />
      <FlyoutDeselectButton />
      <FlyoutDownloadButton selected={selectedItems}>
        Download
      </FlyoutDownloadButton>
    </div>
  );
}
