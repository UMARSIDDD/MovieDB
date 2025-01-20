"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchMoviesByType } from "../store/moviesSlice";
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
  } = useSelector((state: RootState) => state.movies);

  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    dispatch(fetchMoviesByType({ type: "popular", page }));
  }, [page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value); 
  };
  return (
    <>
    <Container  maxWidth="xl" sx={{ py: 4}}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      ) : movies?.length === 0? (
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
           currentPage={page}
           onPageChange={handlePageChange}
         />
          )}
        </>
      )}
    </Container>
    </>

  );
}
