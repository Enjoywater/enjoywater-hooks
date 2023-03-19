import { useMemo } from 'react';

/**
 * 페이지네이션을 위한 커스텀 훅 입니다.
 * @param page 현재 페이지값
 * @param totalCount 모든 페이지의 item 갯수
 * @param pageGroupCount 한 페이지에 보여질 페이지 번호의 수
 * @returns 현재 페이지 그룹, 이전 그룹, 다음 그룹, 이전 그룹의 유무, 다음 그룹의 유무 를 반환합니다.
 */
const usePagination = (page, totalCount, pageGroupCount = 5) => {
  const formatPageArray = (totalCount, pageGroupCount, productCount = 10) => {
    const pageNumbers = [];
    const totalPage = Math.ceil(totalCount / productCount);

    for (let i = 1; i <= totalPage; i += pageGroupCount) {
      const pageGroup = [];

      for (let j = i; j < i + pageGroupCount && j <= totalPage; j++) {
        pageGroup.push(j);
      }

      pageNumbers.push(pageGroup);
    }

    return pageNumbers;
  };

  // 이중배열로 구성된 전체 페이지 그룹을 반환합니다.
  const pageGroups = useMemo(
    () => formatPageArray(totalCount, pageGroupCount),
    [totalCount, pageGroupCount],
  );

  // 현재 페이지가 속한 그룹을 반환합니다.
  const currentPageGroup = useMemo(
    () =>
      pageGroups[
        pageGroups.findIndex((pageGroup) => pageGroup.includes(+page))
      ],
    [pageGroups, page],
  );

  // 이전 그룹의 마지막 페이지를 반환합니다.
  const prevPageGroup = useMemo(
    () => Math.floor((+page - 1) / pageGroupCount) * pageGroupCount,
    [page, pageGroupCount],
  );

  // 다음 그룹의 첫 페이지를 반환합니다.
  const nextPageGroup = useMemo(
    () => Math.ceil(+page / pageGroupCount) * pageGroupCount + 1,
    [page, pageGroupCount],
  );

  // 이전 그룹의 유무를 반환합니다.
  const isFirst = useMemo(() => currentPageGroup[0] === 1, [currentPageGroup]);

  // 다음 그룹의 유무를 반환합니다.
  const isLast = useMemo(
    () => currentPageGroup[0] === pageGroups[pageGroups.length - 1][0],
    [currentPageGroup, pageGroups],
  );

  return { currentPageGroup, prevPageGroup, nextPageGroup, isFirst, isLast };
};

export default usePagination;
