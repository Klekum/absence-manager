import { configureStore } from '@reduxjs/toolkit';

import { reducers } from './slices';

export const store = configureStore({
  reducer: {
    members: reducers.memberReducer,
    absences: reducers.absenceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
