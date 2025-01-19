import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';
import movieDetailsReducer from './movieDetailSlice'; 
export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    moviesDetails:movieDetailsReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;