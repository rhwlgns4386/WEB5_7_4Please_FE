import { useState, useCallback, useMemo } from 'react';

interface UsePaginationProps {
  /** 초기 전체 페이지 수 */
  initialTotalPages?: number;
  /** 초기 페이지 (0부터 시작, 기본값 0) */
  initialPage?: number;
}

export const usePagination = ({
  initialTotalPages = 1,
  initialPage = 0,
}: UsePaginationProps = {}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);

  const goToPage = useCallback(
    (page: number) => {
      const newPage = Math.max(0, Math.min(page, totalPages - 1));
      setCurrentPage(newPage);
    },
    [totalPages]
  );

  const nextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPages]);

  const prevPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  const canGoNext = useMemo(
    () => currentPage < totalPages - 1,
    [currentPage, totalPages]
  );
  const canGoPrev = useMemo(() => currentPage > 0, [currentPage]);

  return {
    currentPage,
    totalPages,
    setTotalPages,
    goToPage,
    nextPage,
    prevPage,
    canGoNext,
    canGoPrev,
  };
};
