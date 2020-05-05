const createStore = () => {
  // The store
  let store,
    listeners = [];

  // getting the store
  const getStore = () => store;

  // subscribing to changes in our store;
  const subscribe = (listener) => {
    // adding the store listener to the list of listeners
    listeners.push(listener);

    // return a function that can be invoked to unsubscribe for the changes by
    // removing the listener from the list of listeners
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  return {
    getStore,
  };
};

// USER

// creating the store;
const store = createStore();

// subscribing to changes in the store;
store.subscribe(() => {
  console.log("The state is:", store.getStore());
});

// unsubscribe from changes in the store
const unSubscribe = store.subscribe(() => {
  console.log("State changed:", store.getStore());
});
// unSubscribe(); to unsubscribe
