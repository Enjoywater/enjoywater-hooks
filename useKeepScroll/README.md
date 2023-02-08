# useKeepScroll

React hook to maintain scroll position using session storage when returning to the page.

<br />

## 📌

---

useKeepScroll is custom React-Hook. <br />
So it works on only React environment. <br />

This hook maintains the scroll position of a specific component, not the window's scroll.

If you want to keep the scroll position of the window, see [here](https://developer.mozilla.org/en-US/docs/Web/API/History/scrollRestoration).

<br />

## 🛠️ &nbsp; Installation

```
$ npm install @enjoywater-hooks/use-keep-scroll
```

<br />

## 🔍 &nbsp; Full Code

```javascript
import { useEffect, useCallback } from 'react';

const useKeepScroll = (scrollRef) => {
  const setScroll = useCallback(() => {
    if (!scrollRef.current) return;

    // Save the current scroll position of scrollRef in session storage.
    sessionStorage.setItem('scrollY', `${scrollRef.current.scrollTop}`);
  }, [scrollRef]);

  useEffect(() => {
    if (!scrollRef.current) return;

    // Get the saved scroll position.
    const scrollValue = sessionStorage.getItem('scrollY');

    // Change the scroll position of scrollRef.
    if (scrollValue) scrollRef.current.scrollTop = +scrollValue;

    // When refreshing, the scroll value in the session storage is initialized.
    const handleRefresh = () => sessionStorage.removeItem('scrollY');
    window.addEventListener('beforeunload', handleRefresh);

    return () => window.removeEventListener('beforeunload', handleRefresh);
  }, [scrollRef]);

  return setScroll;
};

export default useKeepScroll;
```

<br />

## 📝 &nbsp; How To Use

1. Add `import useKeepScroll from "@enjoywater-hooks/use-keep-scroll"` in your component.
2. Add a `ref` to the scrolling component.
3. Put the `ref` component as an argument of `useKeepScroll()`.
4. Execute the returned `setScroll` function wherever you want.

<br />

## 🔍 &nbsp; Example

An example of maintaining the scroll position of the list screen when moving to a detail page.

```javascript
import useKeepScroll from '@enjoywater-hooks/use-keep-scroll';

function Component() {
  const listRef = useRef(null);

  const setScroll = useKeepScroll(listRef);

  const handleItemClick = (id: number) => {
    setScroll();
    push('/detail');
  };

  return (
    <div ref={listRef}>
      <ul>
        <li onClick={handleItemClick}>...</li>
        ...
      </ul>
    </div>
  );
}

export default Component;
```

<br />
