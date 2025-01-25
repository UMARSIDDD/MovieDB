import React from 'react'
import { Box, Typography, Avatar } from '@mui/material'
import Image from 'next/image'
import { Cast } from '@/src/types'

interface CastingProps {
  cast: Cast[]
}
export default function Casting({ cast }: CastingProps) {
  return (
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
      {cast.slice(0, 6).map((actor: Cast) => (
        <Box
          key={actor.id}
          sx={{
            flex: "0 0 auto",
            textAlign: "center",
            width: { xs: "20%", sm: "150px" },
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mx: "auto",
              mb: 1,
              position: "relative",
            }}

          > 
           <Image
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                : "/images/no-image.jpg"
            }
            alt={actor.name}
            priority
            fill={true}
            sizes="(max-width: 600px) 50px, (max-width: 1200px) 80px, 100px"
            style={{ objectFit: "cover" }}
            
          /></Avatar>
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
  )
}
