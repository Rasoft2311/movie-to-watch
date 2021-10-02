<template>
  <div id="app" class="is-family-sans-serif">
    <header>
      <the-navbar />
    </header>
    <transition name="page-fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar.vue";

export default {
  components: {
    TheNavbar,
  },
};
</script>

<style lang="scss">
.page-fade-enter-active {
  transition: opacity 1s ease-in-out;
}
.page-fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.page-fade-enter,
.page-fade-leave-to {
  opacity: 0;
}
</style>
