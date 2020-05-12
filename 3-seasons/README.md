Create Class Component to make use of Lifecycle Methods

In `React`, writing `state = { lat: null, errorMessage: '' };` is essentially the same as the below code because `Babel` converts the code similar to that

```js
constructor(props) {
  super(props);
  this.state = { lat: null, errorMessage: '' }
}
```

We splited our code into different resusable Components as many as possible.

# Note for `SeasonDisplay.js`

`import './SeasonDisplay.css';`: Babel will load this css file to `public/index.html`

We should have a `config` variable for a component if we were to refer to it a lot. And we should also have a CSS className for the root HTML element of the component the same name as the component so it's easier to track later like

```js
<div className={`season-display ${season}`}>
```

of the component `SeasonDisplay`

# Note for `Spinner.js`

```js
Spinner.defaultProps = {
  message: 'Loading...',
};
```

We can use `DefaultProps` to set a default value for State elements in case a value for that element isn't provided. This can be helpful when some elements are used in multiple places, we don't have to provide an `||` clause in multiple places.
