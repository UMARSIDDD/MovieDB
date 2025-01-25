"use client";

import { useCallback, useEffect } from "react";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMoviesByType,
  searchMoviesAsync,
  setCurrentPage,
} from "../store/moviesSlice";
import { AppDispatch, RootState } from "../store/store";
import MovieGrid from "../components/MovieGrid";
import CustomPagination from "../components/CustomPagination";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: movies,
    loading,
    error,
    totalPages,
    currentPage,
    searchQuery,
  } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (searchQuery.trim()) {
      dispatch(searchMoviesAsync({ query: searchQuery, page: currentPage }));
    } else {
      dispatch(fetchMoviesByType({ type: "popular", page: currentPage }));
    }
  }, [currentPage, searchQuery]);

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      dispatch(setCurrentPage(value));
    },
    [dispatch]
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      ) : movies?.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ py: 8 }}
        >
          No results found.
        </Typography>
      ) : (
        <>
          <MovieGrid movies={movies} />
          {totalPages > 1 && (
            <CustomPagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </Container>
  );
}
