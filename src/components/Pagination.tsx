import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Pagination.module.css";

export default function Pagination({ maxPage }: { maxPage: number }) {
  const pages = Array.from(Array(maxPage).keys()).map((number) =>
    (number + 1).toString(),
  );
  const navigate = useNavigate();

  const [urlSearchParams] = useSearchParams();
  const search = urlSearchParams.get("search") || "";
  const currentPage = urlSearchParams.get("page") || "1";

  return (
    <nav>
      <ul className={styles.pagination}>
        {pages.map((page) => (
          <li
            key={page}
            className={`${styles.pageItem} ${page === currentPage ? styles.active : ""}`}
            onClick={() => navigate(`/?search=${search}&page=${page}`)}
          >
            {page}
          </li>
        ))}
      </ul>
    </nav>
  );
}
