<template>
  <div
    class="body-background-image"
    :style="imageUrl ? { 'background-image': 'url(' + imageUrl + ')' } : ''"
  ></div>
</template>

<script>
export default {
  props: {
    imageUrl: String,
  },
};
</script>

<style lang="scss">
.body-background-image {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  opacity: 0.07;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  filter: blur(1px);
  z-index: -1;
}
</style>
