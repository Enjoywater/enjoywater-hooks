# usePagination

React hook for pagination.

<br />

## 📌

usePagination is custom React-Hook. <br />

So it works on only React environment. <br />

<br />

## 🔍 &nbsp; Detail

1. Util function in hooks.

This function returns a group of pages with the structure shown below.
`[ [1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], ... ]`

```javascript
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
```

<br />

2. Parameter and Variable.

```javascript
// page - current page
// totalCount - number of items on all pages
// pageGroupCount - The number of page numbers to be displayed on one page
const usePagination = (page, totalCount, pageGroupCount = 5) => {
  // Returns the entire group of pages organized in a double array.
  const pageGroups = useMemo(
    () => formatPageArray(totalCount, pageGroupCount),
    [totalCount, pageGroupCount],
  );

  // Returns the group the current page belongs to.
  const currentPageGroup = useMemo(
    () =>
      pageGroups[
        pageGroups.findIndex((pageGroup) => pageGroup.includes(+page))
      ],
    [pageGroups, page],
  );

  // Returns the last page of the previous group.
  const prevPageGroup = useMemo(
    () => Math.floor((+page - 1) / pageGroupCount) * pageGroupCount,
    [page, pageGroupCount],
  );

  // Returns the first page of the next group.
  const nextPageGroup = useMemo(
    () => Math.ceil(+page / pageGroupCount) * pageGroupCount + 1,
    [page, pageGroupCount],
  );

  // Returns whether the previous group exists.
  const isFirst = useMemo(() => currentPageGroup[0] === 1, [currentPageGroup]);

  // Returns the existence of the next group.
  const isLast = useMemo(
    () => currentPageGroup[0] === pageGroups[pageGroups.length - 1][0],
    [currentPageGroup, pageGroups],
  );

  // Returns the current page group, previous group, next group, whether or not there is a previous group, and whether there is a next group.
  return { currentPageGroup, prevPageGroup, nextPageGroup, isFirst, isLast };
};

export default usePagination;
```

<br />

## 📝 &nbsp; How To Use

```javascript
const Pagination = ({ page, totalCount, pageGroupCount }: PaginationProps) => {
  const { currentPageGroup, prevPageGroup, nextPageGroup, isFirst, isLast } =
    usePagination(page, totalCount, pageGroupCount);

  return (
    <Container>
      <Link href={`/page/${prevPageGroup}`}>
        <Button disabled={isFirst}>
          <PrevIcon />
        </Button>
      </Link>
      <PageWrapper>
        {currentPageGroup.map((pageNumber) => (
          <Link key={pageNumber} href={`/page/${pageNumber}`}>
            <Page
              selected={pageNumber === +page}
              disabled={pageNumber === +page}
            >
              {pageNumber}
            </Page>
          </Link>
        ))}
      </PageWrapper>
      <Link href={`/page/${nextPageGroup}`}>
        <Button disabled={isLast}>
          <NextIcon />
        </Button>
      </Link>
    </Container>
  );
};

export default Pagination;
```
