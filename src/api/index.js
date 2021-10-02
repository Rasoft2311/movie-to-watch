import axios from "axios";
import { getRandomIntegerInRange } from "../helpers/getRandomIntegerInRange";
import { variables } from "./variables";
const {
  getMovieUrl,
  getMovieImageUrl,
  getMoviesUrl,
  getGenresUrl,
  searchMoviesUrl,
  filterMoviesUrl,
} = variables;

const movieApi = axios.create({
  baseURL: process.env.VUE_APP_MOVIE_API_URL,
  headers: {
    Authorization: "Bearer " + process.env.VUE_APP_MOVIE_ACCESS_TOKEN,
  },
});

export const getMovie = function (id) {
  return movieApi
    .get(getMovieUrl(id))
    .then((res) => res.data)
    .then((movie) => {
      movie.genre_ids = movie.genres.map((el) => el.id);
      return movie;
    });
};

export const getMovies = function (query) {
  return movieApi.get(getMoviesUrl(query)).then((res) => {
    return res.data;
  });
};

export const getFilteredMovies = function (query) {
  return movieApi.get(filterMoviesUrl(query)).then((res) => {
    return res.data;
  });
};

export const searchMovies = function (query) {
  return movieApi.get(searchMoviesUrl(query)).then((res) => {
    return res.data.results;
  });
};

export const getRandomMovie = function () {
  const randomPage = getRandomIntegerInRange(1, 250);
  const randomMovieIndex = getRandomIntegerInRange(0, 19);
  return movieApi.get(getMoviesUrl(`page=${randomPage}`)).then((res) => {
    return res.data.results[randomMovieIndex];
  });
};

export const getImagePath = getMovieImageUrl;

export const getGenres = function () {
  return movieApi.get(getGenresUrl()).then((res) => res.data);
};

export const getFavouriteMovies = function (ids) {
  return Promise.all(
    ids.map((id) =>
      getMovie(id).then((movie) => {
        movie.genre_ids = movie.genres.map((el) => el.id);
        return movie;
      })
    )
  );
};
