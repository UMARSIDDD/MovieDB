import { Metadata } from 'next';
import { MovieDetails } from '@/src/types';
import MovieDetailsClient from './MovieDetailsClient';
import { fetchMovieCredits, fetchMovieDetails, fetchMovies } from '@/src/lib/tmdb';


export const dynamicParams = true;
interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const [popular, topRated, upcoming] = await Promise.all([
    fetchMovies('popular'),
    fetchMovies('top_rated'),
    fetchMovies('upcoming'),
  ]);

  const allMovies = [
    ...popular.items,
    ...topRated.items,
    ...upcoming.items,
  ];

  // Remove duplicates based on movie ID
  const uniqueMovies = Array.from(
    new Map(allMovies.map(movie => [movie.id, movie])).values()
  );

  return uniqueMovies.map((movie) => ({
    id: movie.id.toString(),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const movie = await fetchMovieDetails(id);
  
  return {
    title: `${movie.title} - MovieDB`,
    description: movie.overview,
  };
}

export default async function MovieDetailsPage({ params }: Props) {
  const id =(await params).id;
  const credits = await fetchMovieCredits(id);
  const details = await fetchMovieDetails(id);

  const movie: MovieDetails = {
    ...details,
    cast: credits.cast,
  };

  return <MovieDetailsClient movie={movie} />;
}