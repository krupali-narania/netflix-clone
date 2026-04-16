export const useMovies = () => {
  const config = useRuntimeConfig();
  const base = config.public.tmdbBaseUrl;
  const key = config.public.tmdbApiKey;

  const fetchMovies = (endpoint, extra = {}) =>
    useFetch(`${base}${endpoint}`, { query: { api_key: key, ...extra } }).then(
      ({ data }) => data,
    );

  const getTrendingMovies = () => fetchMovies("/trending/movie/week");
  const getPopularMovies = () => fetchMovies("/movie/popular");
  const getTopRatedMovies = () => fetchMovies("/movie/top_rated");
  const getNowPlayingMovies = () => fetchMovies("/movie/now_playing");

  const getActionMovies = () =>
    fetchMovies("/discover/movie", {
      with_genres: 28,
      sort_by: "popularity.desc",
    });
  const getComedyMovies = () =>
    fetchMovies("/discover/movie", {
      with_genres: 35,
      sort_by: "popularity.desc",
    });
  const getHorrorMovies = () =>
    fetchMovies("/discover/movie", {
      with_genres: 27,
      sort_by: "popularity.desc",
    });
  const getRomanceMovies = () =>
    fetchMovies("/discover/movie", {
      with_genres: 10749,
      sort_by: "popularity.desc",
    });
  const getDocumentaries = () =>
    fetchMovies("/discover/movie", {
      with_genres: 99,
      sort_by: "popularity.desc",
    });
  const getAnimationMovies = () =>
    fetchMovies("/discover/movie", {
      with_genres: 16,
      sort_by: "popularity.desc",
    });
  const getThrillerMovies = () =>
    fetchMovies("/discover/movie", {
      with_genres: 53,
      sort_by: "popularity.desc",
    });

  return {
    getTrendingMovies,
    getPopularMovies,
    getTopRatedMovies,
    getNowPlayingMovies,

    getActionMovies,
    getComedyMovies,
    getHorrorMovies,
    getRomanceMovies,
    getDocumentaries,
    getAnimationMovies,
    getThrillerMovies,
  };
};
