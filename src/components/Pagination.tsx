"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import styles from "./Pagination.module.css";

export default function Pagination({ maxPage }: { maxPage: number }) {
  const pages = Array.from(Array(maxPage).keys()).map((number) =>
    (number + 1).toString(),
  );

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = searchParams.get("page") || "1";

  return (
    <nav>
      <ul className={styles.pagination}>
        {pages.map((page) => {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("page", page);

          return (
            <li
              key={page}
              onClick={() => router.push(`${pathname}?${newSearchParams}`)}
              className={`${styles.pageItem} ${
                page === currentPage ? styles.active : ""
              }`}
            >
              {page}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
