<template>
  <div class="loading-indicator">
    <loader-icon :style="{ width: width }" />
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: "100px",
    },
  },
};
</script>

<style lang="scss">
.loading-indicator {
  & svg {
    height: auto;
  }
}
</style>
