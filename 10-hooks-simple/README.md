# HOOKS

## Intro

<img src="screenshots/intro-1.png" width="400">
<img src="screenshots/intro-2.png" width="320">

## App Outline

<img src="screenshots/app-layout.png" width="600">

## Functions included with Hooks

<img src="screenshots/fn.png" width="500">

- ### `useState`

  ```js
  import React, { useState } from 'react';

  const App = () => {
    const [resource, setResource] = useState('posts');
    const [counter, setCounter] = useState(0);

    return (
      <div>
        <div>
          <button onClick={() => setResource('posts')}>Posts</button>
          <button onClick={() => setResource('todos')}>Todos</button>
        </div>
        {resource}
      </div>
    );
  };

  export default App;
  ```

  <img src="screenshots/useState-1.png" width="900">
  <img src="screenshots/useState-2.png" width="900">

- ### `useEffect`

  Problem with using `componentDidMount` and `componentDidUpdate` to load data and rerender

  <img src="screenshots/useEffect-1.png" width="500">

  Solution to that is by using `useEffect`

  <img src="screenshots/useEffect-2.png" width="500">

  How `useEffect` works

  <img src="screenshots/useEffect-3.png" width="500">

  <img src="screenshots/useEffect-4.png" width="500">

  ```js
  // Determine if the callback function will be called the second time

  useEffect(() => {}); // when we don't provide a second argument to useEffect, it'll call the callback fn forever, similar to the problem with using `componentDidMount` and `componentDidUpdate`

  useEffect(() => {}, []); // no

  useEffect(() => {}, [{ name: 'Alex' }]); // yes, b/c the obj inside has different memory address, that's what useEffect compares

  useEffect(() => {}, [10, 10]); // no

  useEffect(() => {}, [10, 10]); // first time
  useEffect(() => {}, [10]); // second time => no
  ```
