# useKeepScroll

React hook for image lazy loading.

<br />

## 📌

useLazyImage is custom React-Hook. <br />
So it works on only React environment. <br />

This hook uses the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to delay the loading of images.

<br />

## 🛠️ &nbsp; Installation

```
$ npm install @enjoywater-hook/use-lazy-image

or

$ yarn add @enjoywater-hook/use-lazy-image
```

<br />

## 📝 &nbsp; How To Use

1. Add `import LazyImage from "@enjoywater-hook/use-lazy-image"` in your component.
2. Add `props` to the `LazyImage` component.

```javascript
<LazyImage alt="..." src="..." observerOptions={ {...} }>

/*
type

alt : string;
src : string;
observerOptions : {
  root: Element | Document;
  rootMargin: string;
  threshold: number | number[];
}

*/

```

&nbsp; &nbsp; => `observerOptions` has the same value as the options parameter of [IntersectionObserver()](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver).

3. Put the `LazyImage` component at the location of the image to apply lazy loading to.

<br />

## 🔍 &nbsp; Example

1. An example of using LazyImage without `observerOptions`.

```javascript
import LazyImage from '@enjoywater-hook/use-lazy-image';

function Component() {
  return (
    <FoodList>
      {data.map(({ id, imageUrl }) => (
        <Food key={id}>
          <LazyImage src={imageUrl} alt="food" />
        </Food>
      ))}
    </FoodList>
  );
}

export default Component;
```

<br />

2. An example of using LazyImage with `observerOptions`.

```javascript
import LazyImage from '@enjoywater-hook/use-lazy-image';

function Component() {
  return (
    <FoodList>
      {data.map(({ id, imageUrl }) => (
        <Food key={id}>
          <LazyImage
            src={imageUrl}
            alt="food"
            observerOptions={{
              threshold: 0.1,
            }}
          />
        </Food>
      ))}
    </FoodList>
  );
}

export default Component;
```

<br />
