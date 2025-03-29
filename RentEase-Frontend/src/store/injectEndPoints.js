export const injectEndpoints = (store, api) => {
    if (!store.injectedReducers[api.reducerPath]) {
      store.injectedReducers[api.reducerPath] = api.reducer;
      store.replaceReducer(store.createReducer());
    }
  };
  