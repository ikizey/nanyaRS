import { useRouter } from "next/router";
import styles from "./Pagination.module.css";

export default function Pagination({ maxPage }: { maxPage: number }) {
  const pages = Array.from(Array(maxPage).keys()).map((number) =>
    (number + 1).toString(),
  );

  const router = useRouter();
  const query = router.query as Record<string, string>;
  const searchParams = new URLSearchParams(query);
  const currentPage = searchParams.get("page") || "1";

  return (
    <nav>
      <ul className={styles.pagination}>
        {pages.map((page) => (
          <li
            key={page}
            onClick={() => router.push(`/?page=${page}`)}
            className={`${styles.pageItem} ${page === currentPage ? styles.active : ""}`}
          >
            {page}
          </li>
        ))}
      </ul>
    </nav>
  );
}
