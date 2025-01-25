import React from 'react'
import { Box, Typography, Chip } from '@mui/material'
import Image from 'next/image'
import StarIcon from '@mui/icons-material/Star'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { MovieDetails } from '@/src/types'

export default function MovieDetail({movie}:{movie:MovieDetails}) {
  return (
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
                objectFit: "cover",
              }}
            >
              <Image
                src={movie.poster_path?`https://image.tmdb.org/t/p/w500${
                  movie.poster_path }`: "/images/no-image.jpg"}
                alt={movie.title}
                priority
                width={500}
                height={550}
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

  )
}
