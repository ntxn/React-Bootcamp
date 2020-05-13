More on Redux, React-redux, redux-thunk

The term middleware applies to redux library: functions that slightly change the behavior of a redux store => they'll adding new capabilities/features to the redux side of the application

`redux-thunk`: middleware helps us make network requests from the redux side of the app.

To use middleware, we need to register it with redux

```js
// from index.js
const store = createStore(reducers, applyMiddleware(thunk));
```

# Redux Cycle before middleware:

- To change state of our app, we call an `Action Creator` -> produces an `Action` -> gets fed to `dispatch` -> forwards the action to `Reducers` -> creates new `State`
- From `Action creator` to `Reducers`, action gets consumed in fractions of a second (very very quick)
- When an action creator makes an API request (without using async/await), by the time the response comes back, the cycle has been already done but the State wasn't updated with the right data. However, if we use async/await, after `Babel` translates the code into ES5, the action that's actually returned isn't an action, it is just the response object.
- **Rules of Action** An Action is an Object that has a property `type` and an optional property `payload`

# Redux Cycle with Middleware:

- `Action Creator` -> `Action` -> `dispatch` -> **`Middleware`** -> `Reducers` -> `State`
- Using `redux thunk`, an Action can be either an Object or a function. When the function get returned as an Object, it'll need to still have a property `type` and optional `payload`
- We can use async/await in this function Action because `redux thunk` will let us wait for the response and only then manually dispatch the Action Object with the correct data to reducers.

# Rules of Reducers

- Must return any value besides `undefined`
- Produces `state`, or data to be used inside of your app using only previous state and the action
- Must not return reach `out of itself` to decide what value to return (reducers are pure). This means the reducers should not make API requests, getting a file from the hard drive, getting user input or reaching out to the DOM to get some elements. Reducers should only use the previous state and the current action to return a new State.
- Must not mutate its input `state` argument
  - In JS, mutate means you'd change the content/value of an object/array (numbers and strings are immutable) like arr.push('sth'), arr.pop(), obj.name = 'something else'
  - This is a misleading rule b/c you can mutate it and redux wouldn't give you any errors. However, in some cases, mutating the states wouldn't work so that's why in general, we don't want to mutate the state
  - Based on redux source code `hasChanged = hasChanged || nextStateForKey !== previousStateForKey` and `return hasChanged ? nextState : state`, if we mutate the state and return the same state object, then the value of `hasChanged` will be false because the operator `!==` only compares the address. Because you return the same object, the address is the same. When redux return the same state object, it thinks nothing has changed so it doesn't notify React to render new content => you won't see new changes you made.

# Safe state Updates in Reducers for arrays and Objects

## Array

- Remove an element: `state.filter(element => element !== 'hi')`
- Adding an element: `[...state, 'hi']` or `['hi', ...state]`
- Replace an element: `state.map(el => el === 'hi' ? 'bye' : el)`

## Object

`obj = { name: 'Alex' }`

The statement inside `{}` is processed left to right, so whatever properties we have on the right will override the value of the same property name on the left

- Update a property: `{ ...obj, name: 'Sam' }`
- Add a property: `{ ...obj, age: 30 }`
- Remove a property: use [lodash library](https://lodash.com/) `_.omit(obj, 'age')`
