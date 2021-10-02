<template>
  <div v-if="isGenresLoading">Loading</div>
  <div class="has-text-danger" v-else-if="isGenresError">
    Failed to load genres
  </div>
  <div v-else class="movie-filter">
    <div
      v-if="currentGenreIds.length"
      class="is-flex is-flex-wrap-wrap is-align-items-center mb-4 mt-4"
    >
      <h2 class="movie-filter__title mr-3 pb-3 pt-3">Selected filters:</h2>
      <genre-list
        :genre-names="getGenreNamesByIds(currentGenreIds)"
        class="movie-filter__result-genres"
      />
    </div>
    <main-button @click="toggleActive" class="mb-1 mt-1"
      >Select filters</main-button
    >
    <div
      v-scroll-lock="isActive"
      :class="{ 'is-active': isActive }"
      class="modal"
    >
      <div @click="toggleActive" class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Select filter</p>
          <button
            @click="toggleActive"
            class="delete"
            aria-label="close"
          ></button>
        </header>
        <section class="modal-card-body">
          <form class="movie-filter__form">
            <ul class="movie-filter__list">
              <li
                v-for="genre in getGenres"
                :key="genre.id"
                class="movie-filter__list-item"
              >
                <label class="movie-filter__label">
                  <input
                    v-model="selectedGenreIds"
                    :value="genre.id"
                    class="movie-filter__input"
                    type="checkbox"
                  />
                  <span>{{ genre.name }}</span>
                </label>
              </li>
            </ul>
          </form>
        </section>
        <footer class="modal-card-foot">
          <router-link
            :to="{
              name: $route.name,
              query: {
                ...$route.query,
                with_genres: selectedGenreIds.join(','),
              },
            }"
            tag="main-button"
            >Submit changes</router-link
          >
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import GenreList from "./GenreList.vue";
export default {
  data() {
    return {
      isActive: false,
      selectedGenreIds: [],
      currentGenreIds: [],
    };
  },
  components: {
    GenreList,
  },
  props: {
    propertyName: String,
    propertyValues: [],
  },
  computed: {
    ...mapGetters([
      "isGenresLoading",
      "isGenresError",
      "getGenres",
      "getGenreNamesByIds",
    ]),
  },
  watch: {
    $route(to) {
      if (this.isActive) this.toggleActive();
      if (!to.query.with_genres) {
        this.selectedGenreIds = [];
        this.currentGenreIds = [];
        return;
      }
      this.parseGenres(to);
    },
  },
  created() {
    this.parseGenres(this.$route);
  },
  methods: {
    toggleActive() {
      this.isActive = !this.isActive;
    },
    parseGenres(route) {
      const genres = route.query.with_genres;
      if (genres && genres.length) {
        this.currentGenreIds = genres
          .split(",")
          .map((genreId) => parseInt(genreId));
        this.selectedGenreIds = this.currentGenreIds;
      }
    },
  },
};
</script>

<style lang="scss">
@import "../scss/variables.scss";
.movie-filter {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  @include mobile {
    padding: 0 1.2rem;
  }
  &__title {
    font-size: 1.5rem;
  }
  &__result-genres {
    font-size: 0.8rem;
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    &-item {
      padding: 0.5rem;
    }
  }
  &__label {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    white-space: nowrap;
    cursor: pointer;
  }
  &__input {
    width: 25px;
    height: 25px;
    margin-right: 0.5rem;
  }
  & .modal-card-foot {
    display: flex;
    justify-content: center;
  }
}
</style>
