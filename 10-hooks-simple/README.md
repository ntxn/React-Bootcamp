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
