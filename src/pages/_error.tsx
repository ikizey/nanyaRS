import { useRouter } from "next/router";
import styles from "./error.module.css";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className={styles.errorFallback}>
      <p className={styles.errorMessage}>Something went wrong!</p>
      <p className={styles.errorMessage}>We're working on fixing it.</p>
      <button
        className={styles.resetButton}
        onClick={() => {
          router.push("/");
        }}
      >
        Try Again
      </button>
    </div>
  );
}
