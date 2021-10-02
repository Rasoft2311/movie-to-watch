<template>
  <transition name="background-fade">
    <body-background-image :imageUrl="imageUrl" :key="imageUrl" />
  </transition>
</template>

<script>
import BodyBackgroundImage from "./BodyBackgroundImage.vue";
import { loadImage } from "../helpers/loadImage";
export default {
  components: {
    BodyBackgroundImage,
  },
  data: function () {
    return {
      imageUrl: "",
      imageLoadTimeout: null,
    };
  },
  created: function () {
    if (!this.imageUrl) this.updateImage();
  },
  destroyed: function () {
    if (this.imageLoadTimeout) clearTimeout(this.imageLoadTimeout);
  },
  methods: {
    updateImage() {
      this.$movieApi
        .getRandomMovie()
        .then((movie) => {
          if (movie.backdrop_path)
            return loadImage(
              this.$movieApi.getImagePath(movie.backdrop_path, "original")
            );
          throw new Error();
        })
        .then((src) => {
          this.imageUrl = src;
          this.imageLoadTimeout = setTimeout(this.updateImage, 5000);
        })
        .catch(() => this.updateImage());
    },
  },
};
</script>

<style lang="scss">
.background-fade-enter-active {
  transition: opacity 1s ease-in-out;
}
.background-fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.background-fade-enter,
.background-fade-leave-to {
  opacity: 0;
}
</style>
