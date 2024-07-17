import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Pagination.module.css";

export default function Pagination({
  page,
  maxPage,
}: {
  page: string;
  maxPage: number;
}) {
  const pages = Array.from(Array(maxPage).keys()).map((number) => number + 1);
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const { search } = Object.fromEntries(urlSearchParams);
  const navigate = useNavigate();

  return (
    <ul className={styles.pagination}>
      {pages.map((pageNum) => (
        <li
          key={pageNum}
          className={`${styles.pageItem} ${pageNum.toString() === page ? styles.activePageItem : ""}`}
          onClick={() => {
            navigate(`/?search=${search || ""}&page=${pageNum.toString()}`);
          }}
        >
          {pageNum}
        </li>
      ))}
    </ul>
  );
}
