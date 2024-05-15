import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

// const API_KEY = "2102a13528dc91350ddddde3cdd97d0e";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTAyYTEzNTI4ZGM5MTM1MGRkZGRkZTNjZGQ5N2QwZSIsInN1YiI6IjY2MDdmZDdiMGQ0MTdlMDE2MzA1NGUxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jtCK20HDlp8CbkZgmLmdGWO8w-4NMMZSlGRjyibSS8A";
// const url =
//   "https://api.themoviedb.org/3/search/movie?api_key=2102a13528dc91350ddddde3cdd97d0e&language=en-US&page=1&include_adult=false&query=";

const options = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};
async function getTrendingMovies() {
  const response = await axios("/trending/movie/day?language=en-US", options);
  return response.data.results;
}

async function getMovieDetails(id) {
  const response = await axios(`/movie/${id}?language=en-US`, options);
  return response.data;
}

async function getMovieCast(id) {
  const response = await axios(`/movie/${id}/credits`, options);
  return response.data.cast;
}

async function getMovieReviews(id) {
  const response = await axios(`/movie/${id}/reviews`, options);
  return response.data.results;
}

async function getMoviesByName(name) {
  const response = await axios("/search/movie", {
    params: {
      query: name,
    },
    ...options,
  });
  return response.data.results;
}

export {
  getTrendingMovies,
  getMovieDetails,
  getMovieCast,
  getMovieReviews,
  getMoviesByName,
};