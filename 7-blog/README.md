More on Redux, React-redux, redux-thunk

The term middleware applies to redux library: functions that slightly change the behavior of a redux store => they'll adding new capabilities/features to the redux side of the application

`redux-thunk`: middleware helps us make network requests from the redux side of the app.

To use middleware, we need to register it with redux

```js
// from index.js
const store = createStore(reducers, applyMiddleware(thunk));
```

**Redux Cycle before middleware:**

- To change state of our app, we call an `Action Creator` -> produces an `Action` -> gets fed to `dispatch` -> forwards the action to `Reducers` -> creates new `State`
- From `Action creator` to `Reducers`, action gets consumed in fractions of a second (very very quick)
- When an action creator makes an API request (without using async/await), by the time the response comes back, the cycle has been already done but the State wasn't updated with the right data. However, if we use async/await, after `Babel` translates the code into ES5, the action that's actually returned isn't an action, it is just the response object.
- An Action is an Object that has a field `type` and an optional field `payload`

**Now the flow of Redux Cycle with middleware:**

- `Action Creator` -> `Action` -> `dispatch` -> **`Middleware`** -> `Reducers` -> `State`
- Using `redux thunk`, an Action can be either an Object or a function. When the function get returned as an Object, it'll need to still have a field `type` and optional `payload`
- We can use async/await in this function Action because `redux thunk` will let us wait for the response and only then manually dispatch the Action Object with the correct data to reducers.
