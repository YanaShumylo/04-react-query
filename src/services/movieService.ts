import axios from "axios";
import type { Movie } from "../types/movie.ts";
// import Pagination from "../components/Pagination/Pagination.tsx";

interface MoviesHttpResponse {
  results: Movie[];
  total_pages: number;
}

export interface MovieQueryResponse {
  results: Movie[];
  totalPages: number;
}

export const fetchMovies = async (query: string, page: number): Promise<MovieQueryResponse> => {
  try {
    const response = await axios.get<MoviesHttpResponse>(
    `https://api.themoviedb.org/3/search/movie`,
 {
      params: { query, page },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );
    return {
      results: response.data.results,
      totalPages: response.data.total_pages,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.status_message || error.message;
      throw new Error(`Failed to fetch movies: ${status ? `(${status})` : ""} ${message}`);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};