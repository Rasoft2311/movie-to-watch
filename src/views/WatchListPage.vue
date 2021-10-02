<template>
  <div class="app-body">
    <div>
      <main class="container side-padding-touch">
        <body-background-slider />
        <h1 class="page-title">Watch list page</h1>
        <loading-indicator v-if="isFavouriteMoviesLoading" />
        <error-indicator v-else-if="isFavouriteMoviesError" />
        <watch-list v-else :movies="getFavouriteMovies" />
        <p v-if="!getFavouriteMovies.length" class="title is-4">
          Your watch list is currenty empty. Add some movies here
        </p>
      </main>
    </div>
    <the-footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import WatchList from "../components/WatchList.vue";
import BodyBackgroundSlider from "../components/BodyBackgroundSlider.vue";
import TheFooter from "../components/TheFooter.vue";
export default {
  components: {
    WatchList,
    BodyBackgroundSlider,
    TheFooter,
  },
  created: function () {
    this.$store.dispatch("fetchGenres");
    this.$store.dispatch("fetchFavouriteMovies");
  },
  computed: {
    ...mapGetters([
      "getFavouriteMovies",
      "isFavouriteMoviesLoading",
      "isFavouriteMoviesError",
    ]),
  },
};
</script>
