import { useState } from "react";
import styles from "./TestErrorButton.module.css";

export default function TestErrorButton() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    throw new Error("This is a test error.");
  }

  return (
    <button className={styles.errorButton} onClick={() => setHasError(true)}>
      Throw Test Error
    </button>
  );
}
