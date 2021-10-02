<template>
  <footer class="footer side-padding-desktop side-padding-touch">
    <router-link :to="{ name: 'MoviesPage' }" class="footer__logo"
      >🄼🄾🅅🄸🄴 🅃🄾 🅆🄰🅃🄲🄷</router-link
    >
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "../scss/variables.scss";
.footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-top: auto;
  border-top: 2px solid $primary;
  background-color: $background-primary;
  &__logo {
    font-size: 1.5rem;
    color: $primary;
    @include mobile {
      padding: 0.25rem;
      font-size: 1.15rem;
    }
  }
}
</style>
