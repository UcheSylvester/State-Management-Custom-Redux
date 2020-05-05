const createStore = () => {
  // The store
  let store,
    listeners = [];

  // getting the store
  const getStore = () => store;

  const subscribe = (listener) => listeners.push(listener);

  return {
    getStore,
  };
};

// user
const store = createStore();

store.subscribe(() => {
  console.log("The state is:", store.getStore());
});

store.subscribe(() => {
  console.log("new state is:", store.getStore());
});
