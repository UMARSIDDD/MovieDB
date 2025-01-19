import { Grid2 } from "@mui/material";
import MovieCard from "./MovieCard";
import { Movie } from "../types";

export default function MovieGrid({ movies }: { movies: Movie[] }) {
  return (
    <Grid2
      container
      rowSpacing={2}
      columnSpacing={{ xs: 2, sm: 1, md: 2, lg:2 }}
    >
      {movies?.map((movie) => (
        <Grid2
          sx={{
            height: "clamp(50%, 20%, 20%)",
          }}
          size={{ xs: 4, sm: 3, md: 3, lg: 3,xl:2 }}
          key={movie.id}
          component="div"
        >
          <MovieCard movie={movie} />
        </Grid2>
      ))}
    </Grid2>
  );
}
