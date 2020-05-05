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
  // the action and currentState to update the store
  const dispatch = (action) => {
    store = reducer(store, action);

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
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.todo];

    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.id);

    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id !== action.id ? todo : { ...todo, complete: !todo.complete }
      );

    default:
      return state;
  }
};

const goals = (state = [], action) => {
  switch (action.type) {
    case "ADD_GOAL":
      return [...state, action.goal];

    case "REMOVE_GOAL":
      return state.filter((todo) => todo.id !== action.id);

    default:
      return state;
  }
};

const { getStore, subscribe, dispatch } = store;

// const combinedReducer = ({...reducers}) => {

// }

const app = (state = {}, action) => ({
  todos: todos(state.todos, action),
  goals: todos(state.goals, action),
});

// creating the store;
const store = createStore(todos);

// destructure the returned value from the store

// subscribing to changes in the store;
subscribe(() => {
  console.log("The state is:", getStore());
});

dispatch({
  type: "ADD_TODO",
  todo: {
    id: 0,
    name: "Build A mini redux library out of this",
    complete: false,
  },
});

// unsubscribe from changes in the store by calling the function for subscribing
// to changes in the store
// const unSubscribe = subscribe(() => {
//   console.log("State changed:", getStore());
// });
// unSubscribe(); //  to unsubscribe
