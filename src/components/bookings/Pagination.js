"use client";

import styles from "./Pagination.module.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function Pagination({
  page,
  totalPages,
  limit,
  totalCount,
  onPageChange,
  onLimitChange,
}) {
  const getPages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    if (page <= 3) {
      pages.push(1, 2, 3, "...", totalPages);
      return pages;
    }

    if (page >= totalPages - 2) {
      pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      return pages;
    }

    pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);

    return pages;
  };

  const start = totalCount === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalCount);

  return (
    <div className={styles.pagination}>
      <div className={styles.info}>
        Showing {start} to {end} of {totalCount} entries
      </div>

      <div className={styles.pages}>
        <button
          className={styles.arrowBtn}
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          <KeyboardArrowLeftIcon />
        </button>

        {getPages().map((item, index) =>
          item === "..." ? (
            <span key={index} className={styles.dots}>
              ...
            </span>
          ) : (
            <button
              key={item}
              className={`${styles.pageBtn} ${
                page === item ? styles.active : ""
              }`}
              onClick={() => onPageChange(item)}
            >
              {item}
            </button>
          ),
        )}

        <button
          className={styles.arrowBtn}
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          <KeyboardArrowRightIcon />
        </button>
      </div>

      <div className={styles.limitContainer}>
        <select
          className={styles.limitSelect}
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={200}>200</option>
        </select>
        <span>Results Per Page</span>
      </div>
    </div>
  );
}
