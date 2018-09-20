<template>
  <div id="app">
    <button @click="cameraScreen = true" class="action-btn">Open modal</button>
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
}
</style>
