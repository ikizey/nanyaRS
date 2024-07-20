import { ReactNode } from "react";
import { Character } from "../types/character";
import getDownloadUrl from "../lib/character/getDownloadUrl";
import styles from "./Flyout.module.css";

export default function FlyoutDownloadButton({
  children,
  selected,
}: {
  children: ReactNode;
  selected: Character[];
}) {
  return (
    <a
      className={styles.downloadButton}
      href={getDownloadUrl(selected)}
      download={`${selected.length}_characters.csv`}
      role="button"
    >
      {children}
    </a>
  );
}
