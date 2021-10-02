<template>
  <div class="watch-list-item card">
    <div class="card-image">
      <figure class="image is-2by3">
        <router-link :to="{ name: 'MoviePage', params: { id: movie.id } }"
          ><img
            :src="$movieApi.getImagePath(movie.poster_path, 'w342')"
            :alt="`${movie.title} poster`"
            loading="lazy"
        /></router-link>
      </figure>
    </div>
    <div class="card-content is-flex is-align-items-center is-flex-wrap-wrap">
      <div class="watch-list-item__row watch-list-item__row--main">
        <h2 class="title is-5">
          <router-link :to="{ name: 'MoviePage', params: { id: movie.id } }">{{
            movie.title
          }}</router-link>
        </h2>
        <favourite-button
          @click="removeButtonClickHandler()"
          :isActive="true"
          class="watch-list-item__favourite-button"
        />
      </div>
      <div class="watch-list-item__row watch-list-item__row--secondary">
        <div class="mr-6">
          <loading-indicator v-if="isGenresLoading" width="50px" />
          <error-indicator v-else-if="isGenresError" />
          <genre-list
            v-else
            :genre-names="getGenreNamesByIds(movie.genre_ids)"
          />
        </div>
        <movie-rating :rating="movie.vote_average" class="mr-3" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { REMOVE_FAVOURITE_MOVIE } from "../store/modules/favourite/types";
import GenreList from "./GenreList.vue";
export default {
  data: function () {
    return {
      isFavourite: false,
    };
  },
  components: {
    GenreList,
  },
  props: {
    movie: Object,
  },
  computed: {
    ...mapGetters(["isGenresLoading", "isGenresError", "getGenreNamesByIds"]),
  },
  methods: {
    removeButtonClickHandler() {
      this.$store.commit(REMOVE_FAVOURITE_MOVIE, {
        movie: this.movie,
      });
    },
  },
};
</script>

<style lang="scss">
@import "../scss/variables.scss";
.watch-list-item {
  display: flex;
  height: 100%;
  border: 2px solid $primary;
  background-color: transparent;
  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    &--main {
      @media screen and (max-width: 500px) {
        flex-wrap: wrap;
        & > button {
          margin-top: 1rem !important;
          margin-left: auto;
        }
      }
    }
    &--secondary {
      @media screen and (max-width: 500px) {
        display: none;
      }
    }
  }
  & .card-image {
    min-width: 100px;
    flex: 1;
  }
  & .card-content {
    padding: 1rem;
    flex: 8;
    border-left: 2px solid $primary;

    @include mobile {
      border-top: 2px solid $primary;
    }
  }
  & .content {
    margin-top: 1rem;
  }
  & .title {
    margin-bottom: 1rem;
    margin-right: 1rem;
  }
  &__favourite-button {
    margin-left: 0.25rem;
  }
}
</style>
