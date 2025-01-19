"use server";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMovies(
  type: "popular" | "top_rated" | "upcoming",
  page = 1
) {
  const response = await fetch(
    `${BASE_URL}/movie/${type}?api_key=${API_KEY}&language=en-US&page=${page}`
  );

  const data = await response.json();

  // Return movie data with pagination details
  return {
    items: data.results, // The movie items
    totalPages: data.total_pages, // Total number of pages
    currentPage: page, // The current page
  };
}

export async function fetchMovieDetails(id: string) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
  );
  return response.json();
}

export async function fetchMovieCredits(id: string) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
  );
  return response.json();
}
export async function searchMovies(query: string) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`
  );
  return response.json();
}
