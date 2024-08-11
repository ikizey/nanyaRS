import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <h2 className={styles.notFountMessage}>404 - Page Not Found</h2>
      <p className={styles.notFountMessage}>
        The page you are looking for does not exist.
      </p>
    </div>
  );
}
