// LIBRARY CODE
const createStore = (reducer) => {
  // The store
  let store,
    listeners = [];

  // getting the store
  const getStore = () => store;

  // subscribing/listen to changes in our store;
  const subscribe = (listener) => {
    // adding the store listener to the list of listeners
    listeners.push(listener);

    // return a function that can be invoked to unsubscribe for the changes by
    // removing the listener from the list of listeners
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  // dispatch is the function that takes the action and calls the reducer with
  // the action and currentState to udpate the state
  const dispatch = (action) => {
    state = reducer(state, action);

    // alerting all listeners on the store of the new change
    listeners.forEach((listener) => listener());
  };

  return {
    getStore,
    subscribe,
    dispatch,
  };
};

//  APP/USER CODE
// Reducer
const todos = (state = [], action) => {
  if (action.type === "ADD_TODO") return [...state, action.todo];

  return state;
};

// creating the store;
const store = createStore(todos);

// subscribing to changes in the store;
store.subscribe(() => {
  console.log("The state is:", store.getStore());
});

// unsubscribe from changes in the store by calling the function for subscribing
// to changes in the store
const unSubscribe = store.subscribe(() => {
  console.log("State changed:", store.getStore());
});
unSubscribe(); //  to unsubscribe
