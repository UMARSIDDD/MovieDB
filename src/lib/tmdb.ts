"use server";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMovies(
  type: "popular" | "top_rated" | "upcoming",
  page = 1
) {
  try{
  const validPage = Math.min(page, 500);
  const response = await fetch(
    `${BASE_URL}/movie/${type}?api_key=${API_KEY}&language=en-US&page=${validPage}`
  );

  const data = await response.json();


  return {
    items: data.results, 
    totalPages: type === "popular" ? 500 : data.total_pages, 
    currentPage: validPage,
  };
}
catch(error){
  if (error instanceof Error) {
    return { error: error.message };
  } else {
    return { error: "An unknown error occurred" };
  }
}
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
export async function searchMovies(query: string,page:number){
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`
  );
  return response.json();
}
