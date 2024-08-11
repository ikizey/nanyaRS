import { ReactNode } from "react";
import styles from "./CharacterDetail.module.css";

export default function CharacterDetail({
  children,
  name,
}: {
  children: ReactNode;
  name: string;
}) {
  return (
    <p className={styles.detail}>
      <strong>{name}: </strong>
      {children}
    </p>
  );
}
