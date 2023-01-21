import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api-slice';

import { reducers } from './slices';

export const store = configureStore({
  reducer: {
    [ apiSlice.reducerPath ]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
