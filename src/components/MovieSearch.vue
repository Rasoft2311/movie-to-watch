<template>
  <div class="movie-search" v-click-outside="boxClickOutsideHandler">
    <button
      @click="searchButtonClickHandler"
      class="movie-search__button icon-button"
    >
      <transition name="search-fade" mode="out-in">
        <close-icon v-if="isActive" class="movie-search__icon" />
        <search-icon v-else class="movie-search__icon" />
      </transition>
    </button>
    <transition name="box-fade" mode="out-in">
      <div v-show="isActive" class="movie-search__box">
        <input
          ref="searchInput"
          v-model="query"
          class="movie-search__input"
          type="text"
          placeholder="Type to find movie"
        />
        <div class="movie-search__result">
          <p v-if="!result.length">{{ status }}</p>
          <ul v-else>
            <li v-for="movie in slicedResult" :key="movie.id">
              <router-link
                :to="{ name: 'MoviePage', params: { id: movie.id } }"
                class="movie-search__link"
              >
                {{ movie.title }} ({{ getReleaseDate(movie.release_date) }})
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import debounce from "lodash/debounce";
import { getYearFomFullDate } from "../helpers/format";
export default {
  data: function () {
    return {
      isActive: false,
      query: "",
      status: "Type movie name",
      result: [],
      lastRequest: {},
    };
  },
  computed: {
    slicedResult() {
      if (this.result.length > 10) return this.result.slice(0, 10);
      return this.result;
    },
  },
  watch: {
    query() {
      this.result = [];
      this.debouncedGetMovies();
    },
    $route() {
      if (this.isActive) this.searchButtonClickHandler();
    },
  },
  created() {
    this.debouncedGetMovies = debounce(this.getMovies, 300);
  },
  methods: {
    searchButtonClickHandler() {
      this.result = [];
      this.status = "Type movie name";
      this.query = "";
      this.isActive = !this.isActive;
      if (this.isActive) this.$nextTick(() => this.$refs.searchInput.focus());
    },
    boxClickOutsideHandler() {
      if (this.isActive) this.searchButtonClickHandler();
    },
    getMovies: function () {
      if (!this.query) return (this.status = "Type movie name");
      this.status = "Searching...";
      const currentRequest = this.$movieApi.searchMovies(this.query).then(
        (movies) => {
          if (this.lastRequest !== currentRequest) return;
          if (!movies.length)
            return (this.status = "No movies were found by this query");
          this.result = movies;
        },
        () => {
          if (this.lastRequest !== currentRequest)
            this.status = "Error occured, try again later";
        }
      );
      this.lastRequest = currentRequest;
    },
    getReleaseDate(date) {
      return getYearFomFullDate(date);
    },
  },
};
</script>

<style lang="scss">
@import "../scss/variables.scss";
.movie-search {
  position: relative;
  display: flex;
  align-items: center;
  &__box {
    position: absolute;
    right: 0;
    top: 125%;
    padding: 1rem;
    border: 2px solid $primary;
    border-radius: 0.25rem;
    background-color: $background-primary;
  }
  &__button {
    height: 25px;
  }
  &__icon {
    width: 100%;
    height: 100%;
    fill: $primary;
  }
  &__result {
    margin-top: 0.5rem;
  }
  &__input {
    padding: 0.4rem;
    border: 0;
    border-radius: 0.25rem;
    font-size: 1.05rem;
    outline: 0;
    color: $background-primary;
  }
  &__link {
    display: block;
    padding: 0.5rem 0;
    border-bottom: 2px solid $primary;
  }
}
.search-fade-enter-active,
.search-fade-leave-active {
  transition: opacity 0.1s ease-out;
}

.search-fade-enter,
.search-fade-leave-to {
  opacity: 0;
}
.box-fade-enter-active,
.box-fade-leave-active {
  transition: opacity 0.4s ease-in-out;
}

.box-fade-enter,
.box-fade-leave-to {
  opacity: 0;
}
</style>
