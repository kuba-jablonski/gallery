<template>
  <div id="app" @click="cameraScreen = false">
    <img v-for="image in images" :src="image.image" :key="image._id" alt="">
    <button @click.stop="cameraScreen = true" class="action-btn">
      <camera-icon class="action-btn__icon"/>
    </button>
    <camera-screen v-if="cameraScreen" :open="cameraScreen"/>
  </div>
</template>

<script>
import CameraScreen from "@/components/CameraScreen";
import CameraIcon from "@/assets/svg/camera.svg";

export default {
  components: {
    CameraScreen,
    CameraIcon
  },
  data() {
    return {
      cameraScreen: false
    };
  },
  computed: {
    images() {
      return this.$store.state.images;
    }
  },
  mounted() {
    this.$store.dispatch("fetchImages");
  }
};
</script>

<style lang="scss">
@import "css/base";
@import "css/typography";

#app {
  position: relative;
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5rem;
}
</style>

<style lang="scss" scoped>
img {
  width: 100%;
}

.action-btn {
  // width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 5rem;
  right: 5rem;
  height: 8rem;
  width: 8rem;
  background-color: #44c767;
  border-radius: 50%;
  border: none;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 17px;
  // padding:14px 43px;
  text-decoration: none;
  // text-shadow:0px 1px 0px #2f6627;

  &:hover {
    background-color: #5cbf2a;
  }

  &:active {
    // position:relative;
    // top:1px;
  }

  &__icon {
    height: 4.5rem;
    width: 4.5rem;
    fill: #fff;
  }
}
</style>
