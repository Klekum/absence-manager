import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api-slice';

export const setupStore = (preloadedState: any) => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    preloadedState,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }).concat(apiSlice.middleware),
  })
}

export const store = configureStore({
  reducer: {
    [ apiSlice.reducerPath ]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
