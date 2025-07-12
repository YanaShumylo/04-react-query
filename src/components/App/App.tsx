import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import Pagination from "../Pagination/Pagination.tsx";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import type { Movie } from "../../types/movie.ts";
import { fetchMovies, type MovieQueryResponse, } from "../../services/movieService";

export default function App() {
  const [currentPage, setPage] = useState(1);
  const [query, setQuery] = useState("");
const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const {data, isLoading, isError, isSuccess} = useQuery<MovieQueryResponse>({ 
  queryKey: ['movie', query, currentPage], 
    queryFn: () => fetchMovies(query, currentPage), 
    enabled: query !== "",
  placeholderData: keepPreviousData,
});
  
  const totalPages = data?.totalPages ?? 0;

  const handleSearch = (newQuery: string) => {
     
    if (newQuery === query) return;
    setQuery(newQuery);
    setPage(1);
  };
    

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  useEffect(() => {
    if (isSuccess && data.results.length === 0) {
      toast("No movies found for your query.");
    }
  }, [isSuccess, data]);

  return (
    <>
      <Toaster position="top-left" />
      <SearchBar onSubmit={handleSearch} />
{isSuccess && totalPages > 1 && (
        <Pagination 
          page ={currentPage}
          totalPages={totalPages}
          onChange={setPage}
        />
      )}
      
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

     {isSuccess && data.results.length > 0 && (
  <MovieGrid movies={data.results} onSelect={handleSelectMovie} />
)}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
       </>
  );
}
