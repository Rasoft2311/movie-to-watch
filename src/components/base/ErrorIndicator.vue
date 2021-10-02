<template>
  <div class="error-indicator has-text-danger">
    Error occurred, try again later
  </div>
</template>

<script>
export default {
  props: {
    isActive: Boolean,
  },
};
</script>

<style lang="scss">
.error-indicator {
  text-align: center;
}
</style>
