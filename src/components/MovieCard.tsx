"use client";

import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import Link from "next/link";
import { Movie } from "../types";

export default function MovieCard({ movie }: { movie: Movie }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/images/no-image.jpg";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <Link 
      href={`/movie/${movie.id}`} 
      style={{ textDecoration: "none" }}
    >
      <Card
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.2s ease",
          "&:hover": {
            transform: "scale(1.02)",
          },
          bgcolor: "#282c33",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            height: "50%",
            objectFit: "cover",
            backgroundColor: "#f0f0f0",
          }}
          image={posterUrl}
          alt={movie.title || "No title available"}
        />
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "semibold",
              fontSize: "1rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: "#f0f0f0",
            }}
          >
            {movie.title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Typography
              variant="body2"
              color="#f0f0f0"
              sx={{
                ml: 1,
                fontSize: "0.9rem",
              }}
            >
              <strong>Rating</strong>: {rating}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}
