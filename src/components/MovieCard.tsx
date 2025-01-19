"use client";

import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import Link from "next/link";
import { Movie } from "../types";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link href={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          height: "clamp(90%, 100%, 100%)",
          width: "clamp(90%, 100%, 100%)",
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
            height: "clamp(30%, 40%, 50%)",
            objectFit: "cover",
            backgroundColor: "#f0f0f0", // Fixed typo (backbackgroundColor -> backgroundColor)
          }}
          image={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/images/no-image.jpg" // Reference the fallback image from the public directory
          }
          alt={movie.title}
        />
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "semibold",
              fontSize: "clamp(0.5rem, 2vw, 1.2rem)",
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
                fontSize: "clamp(0.5rem, 2vw, 1rem)",
              }}
            >
              <strong>Rating</strong>: {movie.vote_average?.toFixed(1) ?? "N/A"}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}
