import { Outlet } from "react-router-dom";
import useDetails from "../hooks/useDetails";
import SearchBar from "./SearchBar";
import styles from "./Root.module.css";

export default function Root() {
  const { isDetailsPanelOpen } = useDetails();

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <SearchBar />
      </div>
      {isDetailsPanelOpen ? (
        <div className={styles.details}>
          <Outlet />
        </div>
      ) : null}
    </div>
  );
}
