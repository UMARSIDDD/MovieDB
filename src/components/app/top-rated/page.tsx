"use client";

import { useCallback, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import CustomPagination from "@/src/components/CustomPagination";
import { AppDispatch, RootState } from "@/src/store/store";
import { fetchMoviesByType, setCurrentPage } from "@/src/store/movies/moviesSlice";
import MovieGrid from "../../MovieGrid";

export default function TopRated() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: movies,
    loading,
    error,
    totalPages,
    currentPage,
  } = useSelector((state: RootState): RootState['movies'] => state.movies);

 
  useEffect(() => {
    dispatch(fetchMoviesByType({ type: "top_rated", page: currentPage }));
  }, [currentPage]); 

  const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
    console.log("Page changed to:", value);
    dispatch(setCurrentPage(value));
  }, []);

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
