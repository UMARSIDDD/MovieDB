import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieDetails } from "../types";

interface MovieDetailState {
  movie: MovieDetails | null;
  loading: boolean;
  error: string | null;
}

const initialState: MovieDetailState = {
  movie: null,
  loading: false,
  error: null,
};

const movieDetailSlice = createSlice({
  name: "movieDetails",
  initialState,
  reducers: {
    fetchMovieDetailsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMovieDetailsSuccess(state, action: PayloadAction<MovieDetails>) {
      state.movie = action.payload;
      state.loading = false;
    },
    fetchMovieDetailsError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});


export const { fetchMovieDetailsStart, fetchMovieDetailsSuccess, fetchMovieDetailsError } = movieDetailSlice.actions;


export default movieDetailSlice.reducer;
