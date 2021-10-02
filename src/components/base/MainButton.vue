<template>
  <button v-on="$listeners" class="main-button button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    isActive: Boolean,
  },
};
</script>

<style lang="scss">
@import "../../scss/variables.scss";
.main-button {
  border: 2px solid $primary !important;
  border-radius: 0.25rem;
  background: transparent !important;
  color: $primary !important;
  cursor: pointer;
  transition: opacity 0.1s ease-in-out;
  &:hover,
  :focus {
    opacity: 0.85;
  }
  &:active {
    opacity: 0.9;
  }
}
</style>
