<template>
  <div class="app-body">
    <loading-indicator v-if="isLoading" style="margin-top: 30vh" />
    <error-indicator v-else-if="isError" style="margin-top: 30vh" />
    <main v-else class="movie-page side-padding-touch">
      <body-background-image
        :imageUrl="$movieApi.getImagePath(movie.poster_path, 'original')"
        :key="movie.id"
      />
      <div class="container">
        <h1 class="page-title">{{ movie.title }}</h1>
        <div class="is-flex-desktop">
          <section class="movie-page__media">
            <figure class="movie-page__image-wrap image is-2by3">
              <img
                :src="$movieApi.getImagePath(movie.poster_path, 'w500')"
                :alt="`${movie.title} poster`"
                class="movie-page__image"
                loading="lazy"
              />
            </figure>
            <div class="is-flex is-justify-content-space-between mt-4">
              <movie-rating :rating="movie.vote_average" />
              <loading-indicator v-if="isFavouriteMoviesLoading" width="50px" />
              <error-indicator v-else-if="isFavouriteMoviesError" />
              <favourite-button
                v-else
                @click="favouriteButtonClickHandler"
                :isActive="isMovieFavourite(this.movie.id)"
              />
            </div>
          </section>
          <section class="movie-page__about">
            <h2 class="is-hidden">Movie info</h2>
            <ul>
              <li class="mb-2">
                <movie-info-row
                  propertyName="Status"
                  :propertyValues="[movie.status]"
                />
              </li>
              <li class="mb-2">
                <movie-info-row
                  propertyName="Release Date"
                  :propertyValues="[movie.release_date]"
                />
              </li>
              <li class="mb-2">
                <movie-info-row
                  propertyName="Countries"
                  :propertyValues="productionCountries"
                />
              </li>
              <li class="mb-2">
                <movie-info-row
                  propertyName="Genres"
                  :propertyValues="genres"
                />
              </li>
              <li class="mb-2">
                <movie-info-row
                  propertyName="Time"
                  :propertyValues="[runtime]"
                />
              </li>
              <li class="mb-2">
                <movie-info-row propertyName="Age" :propertyValues="[age]" />
              </li>
              <li class="mb-2">
                <movie-info-row
                  propertyName="Budget"
                  :propertyValues="[budget]"
                />
              </li>
              <li class="mb-2">
                <movie-info-row
                  propertyName="Revenue"
                  :propertyValues="[revenue]"
                />
              </li>
              <li class="mb-2">
                <movie-info-row
                  propertyName="Producers"
                  :propertyValues="producers"
                />
              </li>
            </ul>
            <div>
              <h2 class="title is-4 mt-5 mb-3">Overview</h2>
              <p v-if="!movie.overview.length">No overview info</p>
              <p v-else>{{ movie.overview }}</p>
            </div>
          </section>
        </div>
      </div>
      <main-divider class="mt-6 mb-5" />
      <div class="container mb-6">
        <section>
          <h2 class="title is-2">Cast</h2>
          <p v-if="!movie.credits.cast.length">No cast info</p>
          <cast-list v-else :cast="movie.credits.cast" />
        </section>
        <section>
          <h2 class="title is-2 mt-6">Recomendations</h2>
          <p v-if="!movie.similar.results.length">No recommendations</p>
          <recommendation-list
            v-else
            :recommendations="movie.similar.results"
          />
        </section>
      </div>
    </main>
    <the-footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BodyBackgroundImage from "../components/BodyBackgroundImage.vue";
import MovieInfoRow from "../components/MovieInfoRow.vue";
import CastList from "../components/CastList.vue";
import RecommendationList from "../components/RecommendationList.vue";
import TheFooter from "../components/TheFooter.vue";
import {
  mapObjectsToNames,
  formatTime,
  formatAge,
  formatPrice,
  getProducerNames,
} from "../helpers/format";
import {
  ADD_FAVOURITE_MOVIE,
  REMOVE_FAVOURITE_MOVIE,
} from "../store/modules/favourite/types";
export default {
  data: function () {
    return {
      movie: {},
      isLoading: true,
      isError: false,
    };
  },
  components: {
    MovieInfoRow,
    CastList,
    RecommendationList,
    BodyBackgroundImage,
    TheFooter,
  },
  computed: {
    ...mapGetters([
      "isMovieFavourite",
      "isFavouriteMoviesLoading",
      "isFavouriteMoviesError",
    ]),
    productionCountries() {
      return mapObjectsToNames(this.movie.production_countries);
    },
    genres() {
      return mapObjectsToNames(this.movie.genres);
    },
    runtime() {
      return formatTime(this.movie.runtime);
    },
    age() {
      return formatAge(this.movie.adult);
    },
    budget() {
      return this.movie.budget ? formatPrice(this.movie.budget) : 0;
    },
    revenue() {
      return this.movie.revenue ? formatPrice(this.movie.revenue) : 0;
    },
    producers() {
      return getProducerNames(this.movie.credits.crew);
    },
  },
  watch: {
    $route() {
      this.fetchMovie();
    },
  },
  created() {
    this.fetchMovie();
    this.$store.dispatch("fetchFavouriteMovies");
  },
  methods: {
    fetchMovie() {
      this.isLoading = true;
      this.$movieApi.getMovie(this.$route.params.id).then(
        (movie) => {
          this.movie = movie;
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
          this.isError = true;
        }
      );
    },
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
.movie-page {
  &__media {
    flex: 1;
    margin-right: 3rem;
    @include mobile {
      max-width: 500px;
      margin: 0 auto;
      margin-bottom: 2rem;
    }
  }
  &__image {
    &-wrap {
      border: 2px solid $primary;
      border-radius: 0.25rem;
    }
  }
  &__about {
    flex: 2;
  }
}
</style>
