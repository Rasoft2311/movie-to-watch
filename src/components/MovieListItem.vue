<template>
  <div class="movie-list-item card">
    <div class="card-image">
      <figure class="image is-2by3">
        <router-link :to="{ name: 'MoviePage', params: { id: movie.id } }"
          ><img
            :src="$movieApi.getImagePath(movie.poster_path, 'w500')"
            :alt="`${movie.title} poster`"
            loading="lazy"
        /></router-link>
      </figure>
    </div>
    <div class="card-content">
      <h3 class="title is-5">
        <router-link :to="{ name: 'MoviePage', params: { id: movie.id } }">{{
          movie.title
        }}</router-link>
      </h3>
      <div class="is-flex is-align-items-center mb-auto">
        <div class="is-flex-grow-1">
          <loading-indicator v-if="isGenresLoading" width="50px" />
          <error-indicator v-else-if="isGenresError" />
          <genre-list
            v-else
            :genre-names="getGenreNamesByIds(movie.genre_ids)"
          />
        </div>
        <div class="is-flex-shrink-0">
          <loading-indicator v-if="isFavouriteMoviesLoading" width="50px" />
          <error-indicator v-else-if="isFavouriteMoviesError" />
          <favourite-button
            v-else
            @click="favouriteButtonClickHandler"
            :isActive="isMovieFavourite(this.movie.id)"
            class="movie-list-item__favourite-button"
          />
        </div>
      </div>
      <p class="content">
        {{ movie.overview }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  ADD_FAVOURITE_MOVIE,
  REMOVE_FAVOURITE_MOVIE,
} from "../store/modules/favourite/types";
import GenreList from "./GenreList.vue";
export default {
  components: {
    GenreList,
  },
  props: {
    movie: Object,
  },
  computed: {
    ...mapGetters([
      "isFavouriteMoviesLoading",
      "isFavouriteMoviesError",
      "isMovieFavourite",
      "isGenresLoading",
      "isGenresError",
      "getGenreNamesByIds",
    ]),
  },
  methods: {
    favouriteButtonClickHandler() {
      if (!this.isMovieFavourite(this.movie.id)) {
        this.$store.commit(ADD_FAVOURITE_MOVIE, {
          movie: this.movie,
        });
      } else {
        this.$store.commit(REMOVE_FAVOURITE_MOVIE, {
          movie: this.movie,
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import "../scss/variables.scss";
.movie-list-item {
  @include mobile {
    max-width: 400px;
    margin: 0 auto;
  }
  &.card {
    display: flex;
    flex-direction: column;
    height: 100%;
    border: 2px solid $primary;
    background: transparent;
  }
  & .card-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 0.75rem 0.5rem;
    border-top: 2px solid $primary;
  }
  & .content {
    display: block;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-top: 1rem;
  }
  & .title {
    display: block;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 2.25em;
    margin-bottom: 1rem;
    overflow: hidden;
    text-align: center;
  }
  &__add-to-list-button {
    width: 45px;
    margin-left: 0.25rem;
    padding: 0;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: transparent;
    & svg {
      fill: $text-primary;
    }
    &--active {
      & svg {
        fill: red;
      }
    }
  }
}
</style>
