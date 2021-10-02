import { getFavouriteMovies } from "../../../api";
import { get, set } from "lockr";

import {
  GET_FAVOURITE_MOVIES_REQUEST,
  GET_FAVOURITE_MOVIES_SUCCESS,
  GET_FAVOURITE_MOVIES_ERROR,
  REMOVE_FAVOURITE_MOVIE,
  ADD_FAVOURITE_MOVIE,
} from "./types";
export const favourite = {
  state: () => ({
    list: [],
    isLoading: true,
    isError: false,
    isLoaded: false,
  }),
  getters: {
    isMovieFavourite: (state) => (id) => {
      return state.list.some((movie) => movie.id === id);
    },
    isFavouriteMoviesError: (state) => {
      return state.isError;
    },
    isFavouriteMoviesLoading: (state) => {
      return state.isLoading;
    },
    getFavouriteMovies: (state) => {
      return state.list;
    },
  },
  mutations: {
    [GET_FAVOURITE_MOVIES_REQUEST](state) {
      state.list = [];
      state.isError = false;
    },
    [GET_FAVOURITE_MOVIES_SUCCESS](state, { data }) {
      state.isLoading = false;
      state.list = data;
      state.isLoaded = true;
    },
    [GET_FAVOURITE_MOVIES_ERROR](state) {
      state.isLoading = false;
      state.isError = true;
    },
    [ADD_FAVOURITE_MOVIE](state, { movie }) {
      const favouriteMoviesIds = get("favourite_movies_ids");
      favouriteMoviesIds.push(movie.id);
      set("favourite_movies_ids", favouriteMoviesIds);
      state.list.push(movie);
    },
    [REMOVE_FAVOURITE_MOVIE](state, { movie }) {
      set(
        "favourite_movies_ids",
        get("favourite_movies_ids").filter((id) => movie.id !== id)
      );
      state.list = state.list.filter(function (list_item) {
        return list_item.id !== movie.id;
      });
    },
  },
  actions: {
    fetchFavouriteMovies({ commit, state }) {
      if (!state.isLoaded) {
        const favouriteMoviesIds = get("favourite_movies_ids");
        if (!favouriteMoviesIds) return set("favourite_movies_ids", []);
        commit(GET_FAVOURITE_MOVIES_REQUEST);
        getFavouriteMovies(favouriteMoviesIds).then(
          (data) => commit(GET_FAVOURITE_MOVIES_SUCCESS, { data }),
          () => commit(GET_FAVOURITE_MOVIES_ERROR)
        );
      }
    },
  },
};
