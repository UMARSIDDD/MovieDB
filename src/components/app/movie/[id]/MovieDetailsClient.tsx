import { Typography, Box, Chip, Avatar } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import { MovieDetails } from "@/src/types";
import Image from "next/image";
import Casting from "./component/Cast";
import MovieDetail from "./component/MovieDetail";

export default function MovieDetailsClient({ movie }: { movie: MovieDetails }) {
  if (!movie) {
    return <Typography>Movie not found</Typography>;
  }

  return (
    <Box>
      <Box mt={"2vh"} borderRadius={"50px"} bgcolor={"black"} display={"flex"}>
        {/* Details Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            p: 4,
            position: "relative",
            zIndex: 1,
            color: "white",
          }}
        >
          {/* Details  */}
         <MovieDetail movie={movie} />

          {/*Overview */}
          <Box sx={{ mt: 3 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontSize: "clamp(1.2rem, 3vw, 2rem)",
              }}
            >
              Overview
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)",
              }}
            >
              {movie.overview}
            </Typography>
          </Box>
        </Box>
        
        {/* Backdrop poster Section */}
        <Box
          sx={{
            width: "50%",
            borderTopRightRadius: "50px",
            borderBottomRightRadius: "50px",
            display: { xs: "none", sm: "none", md: "block" },
            position: "relative",
          }}
        >
          <Image
            src={movie.backdrop_path? `https://image.tmdb.org/t/p/original${
              movie.backdrop_path }`: "/images/no-image.jpg"
            }
            alt={movie.title}
            priority
            className="rounded-r-lg"
            fill={true} 
            sizes="(max-width: 768px) 10vw, 
             (max-width: 1200px) 20vw, 
             33vw"
            style={{ objectFit: "cover" }}
          />
        </Box>
      </Box>

      {/* Cast Section */}
      <Casting cast={movie.cast}/>
    </Box>
  );
}
