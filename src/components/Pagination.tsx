import { useLoaderData, useNavigate } from "react-router-dom";
import styles from "./Pagination.module.css";
import { ResultsLoaderData } from "../loaders/resultsLoader";

export default function Pagination({
  page,
  maxPage,
  onChange,
}: {
  page: string;
  maxPage: number;
  onChange: () => void;
}) {
  const pages = Array.from(Array(maxPage).keys()).map((number) => number + 1);
  const { searchTerm } = useLoaderData() as ResultsLoaderData;
  const search = searchTerm || "";
  const navigate = useNavigate();

  return (
    <ul className={styles.pagination}>
      {pages.map((pageNum) => (
        <li
          key={pageNum}
          className={`${styles.pageItem} ${pageNum.toString() === page ? styles.activePageItem : ""}`}
          onClick={() => {
            onChange();
            navigate(`/?search=${search || ""}&page=${pageNum.toString()}`);
          }}
        >
          {pageNum}
        </li>
      ))}
    </ul>
  );
}
