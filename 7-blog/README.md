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
- Whenever we `dispatch` an `Action`, the `Action` will first be sent to `Redux Thunk`. After `Redux Thunk` is done processing each `Action`, it'll send each `Action` to all `Reducers`.
- With `redux thunk`, an Action Creator can return either an Object or a function. The final Action Object still has to meet the `Rules of Action`.
- When an Action Creator return a function, that function will have access to 2 functions, `dispatch` and `getState`, as parameters. With this, we have total control over changing or getting infomation out of Redux Store.
- Since the Action that's being passed to `Reducers` is still an Object, the final steps of a redux thunk should be `dispatch`ing the Action Object.
- We can use async/await in this function Action because `redux thunk` will let us wait for the response and only then manually dispatch the Action Object with the correct data to reducers.

```js
export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get('/posts');
  dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({ type: 'FETCH_USER', payload: response.data });
};
```

# Rules of Reducers

- Must return any value besides `undefined`
- Produces `state`, or data to be used inside of your app using only previous state and the action
- Must not return reach `out of itself` to decide what value to return (reducers are pure). This means the reducers should not make API requests, getting a file from the hard drive, getting user input or reaching out to the DOM to get some elements. Reducers should only use the previous state and the current action to return a new State.
- Must not mutate its input `state` argument
  - In JS, mutate means you'd change the content/value of an object/array (numbers and strings are immutable) like arr.push('sth'), arr.pop(), obj.name = 'something else'
  - This is a misleading rule b/c you can mutate it and redux wouldn't give you any errors. However, in some cases, mutating the states wouldn't work so that's why in general, we don't want to mutate the state
  - Based on redux source code `hasChanged = hasChanged || nextStateForKey !== previousStateForKey` and `return hasChanged ? nextState : state`, if we mutate the state and return the same state object, then the value of `hasChanged` will be false because the operator `!==` only compares the address. Because you return the same object, the address is the same. When redux return the same state object, it thinks nothing has changed so it doesn't notify React to render new content => you won't see new changes you made.

```js
// Example of a reducer with switch statement
export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_POSTS': // 'FETCH_USER'
      return action.payload; // [...state, action.payload];
    default:
      return state;
  }
};
```

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

# Solve problems with fetching the same users multiple times

## Solution 1: Use lodash \_.memoize()

```js
export const fetchUser = id => dispatch => _fetchUser(id, dispatch);

const _fetchUser = _.memoize(async (id, dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({ type: 'FETCH_USER', payload: response.data });
});
```

It is not the best solution because it's hard to understand and if we want to refetch a user, memoize won't let us do that.

## Solution 2:

We'll have an action creator that calls `fetchPosts` to fetch all the posts, then pulls out all the unique userId's from the posts. Only then we'll call `fetchUser` for each of those userId

```js
// actions
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
};

// PostList.js: call fetchPostsAndUsers instead of fetchPosts
this.props.fetchPostsAndUsers();

// UserHeader.js: won't need action creator fetchUser anymore
export default connect(mapStateToProps)(UserHeader);
```
