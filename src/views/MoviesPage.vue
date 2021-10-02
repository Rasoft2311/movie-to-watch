<template>
  <div class="app-body">
    <div>
      <main class="container side-padding-touch">
        <body-background-slider />
        <h1 class="page-title">Movies for everyone</h1>
        <movie-list-section />
      </main>
    </div>
    <the-footer />
  </div>
</template>

<script>
import BodyBackgroundSlider from "../components/BodyBackgroundSlider.vue";
import MovieListSection from "../components/MovieListSection.vue";
import TheFooter from "../components/TheFooter.vue";

export default {
  components: {
    BodyBackgroundSlider,
    MovieListSection,
    TheFooter,
  },
};
</script>
