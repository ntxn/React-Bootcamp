Simple app to introduce to Redux, React-Redux

# Mapping Analogy to Redux

**Redux Cycle** -------- **Insurance Company**

Action Creator ------- Person dropping off the form

Action --------------- The form

Dispatch ------------- Form receiver

Reducers ------------ Departments

State ---------------- Compiled department data

`store` is a combination of `reducers` and `state`. When the `dispatch` function is called on the store, it'll pass the newly created action to all reducers and the reducers will perform appropreate actions and return the state. Instead of letting each components having its own state, we let store contains all the states/data

```js
// People dropping off a form (Action Creator)
const createPolicy = (name, amount) => {
  return {
    // Action (a form in our analogy)
    type: 'CREATE_POLICY',
    payload: { name, amount },
  };
};

const deletePolicy = name => {
  return {
    // Action (a form in our analogy)
    type: 'DELETE_POLICY',
    payload: { name },
  };
};

const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    // Action (a form in our analogy)
    type: 'CREATE_CLAIM',
    payload: { name, amountOfMoneyToCollect },
  };
};

// Reducers (Departments)
const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === 'CREATE_CLAIM') {
    // We care about this action (form)
    return [...oldListOfClaims, action.payload];
  }
  // we don't care about the action
  return oldListOfClaims;
};

const accounting = (bagOfMoney = 100, action) => {
  if (action.type === 'CREATE_CLAIM') {
    return bagOfMoney - action.payload.amountOfMoneyToCollect;
  }

  if (action.type === 'CREATE_POLICY') {
    return bagOfMoney + action.payload.amount;
  }

  return bagOfMoney;
};

const policies = (listOfPolicies = [], action) => {
  if (action.type === 'CREATE_POLICY') {
    return [...listOfPolicies, action.payload.name];
  }

  if (action.type === 'DELETE_POLICY') {
    return listOfPolicies.filter(name => name !== action.payload.name);
  }

  return listOfPolicies;
};

const { createStore, combineReducers } = Redux;
const ourDepartments = combineReducers({
  accounting,
  claimsHistory,
  policies,
});

const store = createStore(ourDepartments);

store.dispatch(createPolicy('Alex', 20));
store.dispatch(createPolicy('Jim', 30));
store.dispatch(createPolicy('Bob', 40));
console.log(store.getState());

store.dispatch(createClaim('Alex', 120));
console.log(store.getState());

store.dispatch(createClaim('Jim', 50));
console.log(store.getState());

store.dispatch(deletePolicy('Bob'));
console.log(store.getState());
```

# react-redux library

It is a library to connect `redux` to `react`

It has two main components: `Provider` and `connect`.

`Provider` takes in redux's store as props and wraps around the React `App`

```js
<Provider store={createStore(reducers)}>
  <App />
</Provider>
```

Then in any components within the `App` needs access to the store, we need to call `connect` in that component. We pass in `connect` a function to define which state elements we need (`mapStateToProps`). And if that component needs to have access to `Action Creators`, then we pass another Obj with those Action Creator functions to make `redux` links the functions to the `State`

```js
const mapStateToProps = state => {
  return { songs: state.songs };
};

export default connect(mapStateToProps, { selectSong })(SongList);
```
