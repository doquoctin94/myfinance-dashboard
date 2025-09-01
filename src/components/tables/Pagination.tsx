import { useCallback } from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalItems: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  limit,
  totalItems,
  onPageChange,
}) => {
  const pagesAroundCurrent = Array.from(
    { length: Math.min(3, totalPages) },
    (_, i) => i + Math.max(currentPage - 1, 1)
  );

  const onNextPage = useCallback(() => {
    onPageChange(currentPage + 1)
  }, [currentPage, onPageChange])

  const onPreviousPage = useCallback(() => {
    onPageChange(currentPage - 1)
  }, [currentPage, onPageChange])

  return (
    <div className="flex items-center p-4 justify-between">
      <div className="flex items-center justify-start">
        <span className="text-gray-500 dark:text-gray-400">
          Bạn đang xem: {currentPage * limit > totalItems ? totalItems : currentPage * limit} / {totalItems}
        </span>
      </div>

      <div className="flex items-center justify-end">
        <button
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          className="mr-2.5 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] text-sm"
        >
          {'<<'}
        </button>
        <div className="flex items-center gap-2">
          {currentPage > 3 && <span className="px-2">...</span>}
          {pagesAroundCurrent.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded ${currentPage === page
                ? "bg-brand-500 text-white"
                : "text-gray-700 dark:text-gray-400"
                } flex w-10 items-center justify-center h-10 rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500`}
            >
              {page}
            </button>
          ))}
          {currentPage < totalPages - 2 && <span className="px-2">...</span>}
        </div>
        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs text-sm hover:bg-gray-50 h-10 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
