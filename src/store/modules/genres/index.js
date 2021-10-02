import { getGenres } from "../../../api";
import {
  GET_GENRES_ERROR,
  GET_GENRES_REQUEST,
  GET_GENRES_SUCCESS,
} from "./types";
export const genres = {
  state: () => ({
    list: [],
    isLoading: true,
    isError: false,
    isLoaded: false,
  }),
  getters: {
    getGenreNamesByIds: (state) => (ids) => {
      return ids.map((id) => state.list.find((genre) => genre.id === id).name);
    },
    getGenres: (state) => {
      return state.list;
    },
    isGenresError: (state) => {
      return state.isError;
    },
    isGenresLoading: (state) => {
      return state.isLoading;
    },
  },
  mutations: {
    [GET_GENRES_REQUEST](state) {
      state.list = [];
      state.isError = false;
    },
    [GET_GENRES_SUCCESS](state, { data }) {
      state.isLoading = false;
      state.list = data.genres;
      state.isLoaded = true;
    },
    [GET_GENRES_ERROR](state) {
      state.isLoading = false;
      state.isError = true;
    },
  },
  actions: {
    fetchGenres({ commit, state }) {
      if (!state.isLoaded) {
        commit(GET_GENRES_REQUEST);
        getGenres().then(
          (data) => commit(GET_GENRES_SUCCESS, { data }),
          () => commit(GET_GENRES_ERROR)
        );
      }
    },
  },
};
