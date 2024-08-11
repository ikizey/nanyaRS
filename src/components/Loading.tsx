"use client";

import { ReactNode } from "react";
import styles from "./Loading.module.css";

export default function Loading({
  children = <p>Loading...</p>,
}: {
  children?: ReactNode;
}) {
  return (
    <div className={styles.loading} role="status">
      {children}
    </div>
  );
}
