"use client";

import {
  Container,
  Grid2,
  Typography,
  Box,
  Paper,
  Chip,
  Avatar,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import { MovieDetails } from "@/src/types";

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
          {/* First Box: Details  */}
          <Box
            sx={{
              display: "flex",
              flex: 1,
              gap: 3,
              mb: 2,
            }}
          >
            {/* Poster Image */}
            <Box
              sx={{
                flex: 1,
                maxWidth: "30%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={`https://image.tmdb.org/t/p/w500${
                  movie.poster_path || ""
                }`}
                alt={movie.title}
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Box>

            {/* Title, Rating, Genres, Release Date */}
            <Box
              sx={{
                flex: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{
                  fontSize: "clamp(1.5rem, 4vw, 2.5rem)", 
                }}
              >
                {movie.title}
              </Typography>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                {movie.vote_average !== undefined && (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <StarIcon sx={{ color: "warning.main", mr: 0.5 }} />
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "clamp(0.8rem, 2.5vw, 1.25rem)",
                      }}
                    >
                      {movie.vote_average.toFixed(1)}
                    </Typography>
                  </Box>
                )}
                {movie.runtime !== undefined && (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <AccessTimeIcon sx={{ mr: 0.5 }} />
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "clamp(0.8rem, 2.5vw, 1.25rem)", 
                      }}
                    >
                      {movie.runtime} min
                    </Typography>
                  </Box>
                )}
              </Box>

              <Box sx={{ mb: 3 }}>
                {movie.genres?.map((genre) => (
                  <Chip
                    key={genre.id}
                    label={genre.name}
                    sx={{
                      mr: 1,
                      mb: 1,
                      backgroundColor: "rgba(255,255,255,0.1)",
                      color: "white",
                      fontSize: "clamp(0.7rem, 2vw, 1rem)",
                    }}
                  />
                )) || <Typography>No genres available</Typography>}
              </Box>

              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: "clamp(0.8rem, 2.5vw, 1.25rem)", 
                }}
              >
                Release Date: {movie.release_date}
              </Typography>
            </Box>
          </Box>

          {/* Second Box: Overview */}
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

        <Box
          
          sx={{
            width: "50%",
            borderTopRightRadius:'50px',
            borderBottomRightRadius:'50px',

            backgroundImage: `url(https://image.tmdb.org/t/p/original${
              movie.backdrop_path || ""
            })`,
            backgroundSize: "cover",
            display: { xs: "none", sm: "none", md: "block" },
          }}
        />
      </Box>

      {/* Cast Section */}
      <Box sx={{ mt: 4, p: 2 }}>
        <Typography
          variant="h5"
          color="white"
          gutterBottom
          sx={{
            fontSize: "clamp(1.2rem, 3vw, 2rem)",
          }}
        >
          Cast
        </Typography>
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: "5vh",
            scrollbarWidth: "none", 
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {movie?.cast.slice(0, 6).map((actor) => (
            <Box
              key={actor.id}
              sx={{
                flex: "0 0 auto",
                textAlign: "center",
                width: { xs: "20%", sm: "150px" }, 
              }}
            >
              <Avatar
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : undefined
                }
                alt={actor.name}
                sx={{
                  width: 80,
                  height: 80,
                  mx: "auto",
                  mb: 1,
                }}
              />
              <Typography
                variant="subtitle2"
                color="white"
                sx={{
                  fontSize: "clamp(0.8rem, 2.5vw, 1rem)",
                }}
              >
                {actor.name}
              </Typography>
              <Typography
                variant="caption"
                color="white"
                
                sx={{
                  fontSize: "clamp(0.7rem, 2vw, 0.9rem)",
                }}
              >
                {actor.character}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
