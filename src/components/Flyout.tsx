import styles from "./Flyout.module.css";

export default function Flyout({
  itemsCount,
  downloadUrl,
  onDeselectAll,
}: {
  itemsCount: number;
  downloadUrl: string;
  onDeselectAll: () => void;
}) {
  return (
    <div className={styles.flyout}>
      <p>{`${itemsCount} ${itemsCount === 1 ? "item" : "items"} selected`}</p>
      <button onClick={onDeselectAll}>Deselect all</button>
      <a
        className={styles.downloadButton}
        href={downloadUrl}
        download={`${itemsCount}_characters.csv`}
        role="button"
      >
        Download
      </a>
    </div>
  );
}
