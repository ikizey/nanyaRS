import styles from "./ErrorFallback.module.css";

export default function ErrorFallback({ onReset }: { onReset: () => void }) {
  return (
    <div className={styles.errorFallback}>
      <p className={styles.errorMessage}>Something went wrong!</p>
      <p className={styles.errorMessage}>We're working on fixing it.</p>
      <button className={styles.resetButton} onClick={onReset}>
        Try Again
      </button>
    </div>
  );
}
