import React, { useCallback } from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  siblingCount?: number; // số trang hiển thị xung quanh current (mặc định 1 => tổng 3)
};

const DOTS = "DOTS";

function range(start: number, end: number): number[] {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
}

export function usePagination({
  totalPages,
  currentPage,
  siblingCount = 1,
}: {
  totalPages: number;
  currentPage: number;
  siblingCount?: number;
}): (number | string)[] {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPages <= totalPageNumbers) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  // 👉 chỉ hiện dấu ... bên phải
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount);
    return [...leftRange, DOTS, totalPages];
  }

  // 👉 chỉ hiện dấu ... bên trái
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = range(totalPages - rightItemCount + 1, totalPages);
    return [1, DOTS, ...rightRange];
  }

  // 👉 hiện dấu ... hai bên
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [1, DOTS, ...middleRange, DOTS, totalPages];
  }

  // fallback
  return range(1, totalPages);
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  limit,
  totalItems,
  onPageChange,
  siblingCount = 1,
}) => {
  const safeTotalPages = Math.ceil(totalPages);
  const safeCurrent = Math.min(Math.max(1, Math.floor(currentPage)), Math.max(1, safeTotalPages || 1));

  const paginationRange = usePagination({
    totalPages: safeTotalPages,
    currentPage: safeCurrent,
    siblingCount,
  });

  const onNext = useCallback(() => {
    if (safeCurrent < safeTotalPages) onPageChange(safeCurrent + 1);
  }, [safeCurrent, safeTotalPages, onPageChange]);

  const onPrev = useCallback(() => {
    if (safeCurrent > 1) onPageChange(safeCurrent - 1);
  }, [safeCurrent, onPageChange]);

  // items range text
  const startItem = totalItems === 0 ? 0 : (safeCurrent - 1) * limit + 1;
  const endItem = Math.min(totalItems, safeCurrent * limit);

  // khi không có trang nào
  if (safeTotalPages === 0 || totalItems === 0) {
    return (
      <div className="flex items-center p-4 justify-between">
        <div className="text-gray-500 dark:text-gray-400 text-sm">Bạn đang xem: 0 / {totalItems}</div>
        <div className="flex items-center">
          <button className="mr-2.5 px-3 py-2 rounded disabled:opacity-50" disabled>
            {"<<"}
          </button>
          <div className="px-4 py-2 text-sm text-gray-500">Không có trang</div>
          <button className="ml-2.5 px-3 py-2 rounded disabled:opacity-50" disabled>
            {">>"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center p-4 justify-between flex-col md:flex-row">
      <div className="text-gray-500 dark:text-gray-400 text-sm">
        Bạn đang xem: {startItem}-{endItem} / {totalItems} &nbsp;·&nbsp; Trang {safeCurrent} / {safeTotalPages}
      </div>

      <div className="flex items-center">
        <button
          onClick={onPrev}
          disabled={safeCurrent === 1}
          className="mr-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] text-sm h-10"
        >
          {"<<"}
        </button>

        <div className="flex items-center gap-2">
          {paginationRange.map((p, idx) =>
            p === DOTS ? (
              <span key={`dots-${idx}`} className="px-2 select-none">
                ...
              </span>
            ) : (
              <button
                key={p}
                onClick={() => {
                  if (p !== safeCurrent) onPageChange(Number(p));
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium h-10 w-10 flex items-center justify-center ${p === safeCurrent
                  ? "bg-brand-500 text-white"
                  : "text-gray-700 dark:text-gray-400 hover:bg-blue-500/[0.08] hover:text-brand-500"
                  }`}
                aria-current={p === safeCurrent ? "page" : undefined}
              >
                {p}
              </button>
            )
          )}
        </div>

        <button
          onClick={onNext}
          disabled={safeCurrent === safeTotalPages}
          className="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs text-sm hover:bg-gray-50 h-10 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
