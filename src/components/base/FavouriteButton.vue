<template>
  <button v-on="$listeners" class="favourite-button icon-button">
    <add-to-list-icon :isActive="isActive" />
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
.favourite-button {
  width: 45px;
  transition: 0.3s ease-in-out;
  &:hover,
  &:focus {
    opacity: 0.8;
  }
}
</style>
