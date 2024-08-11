"use client";

import { useRouter } from "next/navigation";
import React from "react";
import styles from "./error.module.css";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className={styles.errorFallback}>
      <p className={styles.errorMessage}>Something went wrong!</p>
      <p className={styles.errorMessage}>We&apos;re working on fixing it.</p>
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
