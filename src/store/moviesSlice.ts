import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../types';
import { fetchMovies, searchMovies } from '../lib/tmdb';

interface MoviesState {
  items: Movie[];
  loading: boolean;
  error: string | null;
  searchQuery: string; 
  totalPages: number;
  currentPage: number;

}

const initialState: MoviesState = {
  items: [],
  loading: false,
  error: null,
  searchQuery: '',
  totalPages: 0,
  currentPage: 1,
};

export const fetchMoviesByType = createAsyncThunk(
  'movies/fetchMoviesByType',
  async ({ type, page }: { type: 'popular' | 'top_rated' | 'upcoming'; page?: number }) => {
    const data = await fetchMovies(type, page);
    return data; 
  }
);


export const searchMoviesAsync = createAsyncThunk(
  'movies/search',
  async (query: string) => {
    const response = await searchMovies(query);
    return response.results;
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload; 
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload; 
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesByType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesByType.fulfilled, (state, action: PayloadAction<{ items: Movie[]; totalPages: number; currentPage: number }>) => {
        state.loading = false;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.items = action.payload.items;
      })
      .addCase(fetchMoviesByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movies';
      })
      .addCase(searchMoviesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMoviesAsync.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(searchMoviesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search movies';
      });
  },
});

export const { setSearchQuery , setCurrentPage} = moviesSlice.actions;

export default moviesSlice.reducer;
