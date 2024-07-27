import { useNavigate } from "react-router-dom";
import styles from "./ErrorFallback.module.css";

export default function ErrorFallback() {
  const navigate = useNavigate();

  return (
    <div className={styles.errorFallback}>
      <p className={styles.errorMessage}>Something went wrong!</p>
      <p className={styles.errorMessage}>We're working on fixing it.</p>
      <button
        className={styles.resetButton}
        onClick={() => {
          navigate("/");
        }}
      >
        Try Again
      </button>
    </div>
  );
}
