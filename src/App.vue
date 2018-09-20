<template>
  <div id="app">
    <button @click="cameraScreen = true" class="action-btn"></button>
    <camera-screen v-if="cameraScreen" :open="cameraScreen"/>
  </div>
</template>

<script>
import CameraScreen from "@/components/CameraScreen";

export default {
  components: {
    CameraScreen
  },
  data() {
    return {
      cameraScreen: false
    };
  }
};
</script>

<style lang="scss">
@import "css/base";
@import "css/typography";

#app {
  position: relative;
  min-height: 100vh;
}
</style>

<style lang="scss" scoped>
button {
  // width: 50%;
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
}
</style>
