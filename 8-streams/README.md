# Overview

## Building a streaming web app service similar to `twitch` but way simpler

<img src="screenshots/app-outline.png" width="700">

<img src="screenshots/twitch-vs-our-app.png" width="450">

<img src="screenshots/login-vs-logout.png" width="450">

## Some Mockups

<img src="screenshots/mockups-1.png" width="450">

<img src="screenshots/mockups-2.png" width="450">

<img src="screenshots/mockups-3.png" width="450">

<img src="screenshots/mockups-4.png" width="450">

<img src="screenshots/mockups-5.png" width="450">

<img src="screenshots/mockups-6.png" width="450">

## App Challenges

- Need to be able to navigate around to separate pages in our app -> will use `React Router`
- Need to allow a user to login/logout -> Use Google Oauth to do authentication
- Need to handle forms in Redux
- Need to master CRUD operations in React-Redux
- Errors will likely occur. Need good error handling

## Dependencies

### react-router-dom

<img src="screenshots/react-router-family.png" width="600">

We never want to install `react-router` by itself. `react-router` library published on npm is the core library of everything inside react-router general project: it decides how to work with react, how to change content out depending on different rules...

To get the actual implementation logic of react-router that works inside the browser, we'd install `react-router-dom`. So whenever we want to use `react router` in a project to handle navigation in browsers, we always use `react-router-dom`

# Theory

## How React Router Works

```js
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

const PageOne = () => {
  return <div>PageOne</div>;
};

const PageTwo = () => {
  return (
    <div>
      PageTwo
      <button>Click Me</button>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path="/" exact component={PageOne} />
          <Route path="/pagetwo" component={PageTwo} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
```

  <img src="screenshots/how-react-router-works-1.png" width="500">
  
  <img src="screenshots/how-react-router-works-2.png" width="600">

  <img src="screenshots/how-react-router-works-3.png" width="600">

  <img src="screenshots/how-react-router-works-4.png" width="600">

What RR really cares about is the part after the domain, so RR extracts that path out.

By default, RR checks if this path contains the paths define with `Route` to display all the contained paths. In the example, the extracted path is `/page` so it'll display the components in path `/` and `/page`.

To override this behavior, we'd include another props `exact` to `Route` like `<Route path="/" exact component={PageOne} />`. With the keyword `exact`, RR will compare `===` instead of `contains`. If it doesn't match 100%, it won't display anything. This only work for any Routes that includes `exact`

## Navigation with React Router

We usually use anchor tage `<a>` to navigate between different pages such as `<a href="/pagetwo">Navigate to Page Two</a>`. Even though using `<a>` seems to work, we don't want to use it with React Router because when you click on the `<a>` tag, the browser will make the request and replace the current HTML by the new response HTML. It also dump all the data that had been loaded into the react-redux application. The users have to do it all over again to have that data back.

  <img src="screenshots/navigation-with-react-router-1.png" width="600">

To solve this problem, we'll use `Link` Component from `react-router-dom` in place of an anchor tag: `<Link to="/pagetwo">Navigate to Page Two</Link>`. By using `Link`, RR will prevent the browsers from making a request to the server. Instead RR will look at the route and hide/show different components on the same HTML file

  <img src="screenshots/navigation-with-react-router-2.png" width="600">
  <img src="screenshots/navigation-with-react-router-3.png" width="600">