<template>
  <div v-masonry transition-duration="0.3s" item-selector=".grid-item" id="app" @click="cameraScreen = false">
    <div v-masonry-tile class="grid-item" v-for="image in images" :key="image._id">
      <img class='grid-img' :src="image.image">
    </div>
    
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
}
</style>

<style lang="scss" scoped>
// GRID STYLES
$gutter: 0px;

@function columnOneOf($numOfColumns) {
  @return calc(
    (100% - ((#{$numOfColumns} - 1) * #{$gutter})) / #{$numOfColumns}
  );
}

.gutter-sizer {
  width: $gutter;
}

.grid-item {
  width: columnOneOf(5);

  @media screen and (max-width: 1024px) {
    width: columnOneOf(4);
  }

  @media screen and (max-width: 800px) {
    width: columnOneOf(3);
  }

  @media screen and (max-width: 650px) {
    width: columnOneOf(2);
  }

  @media screen and (max-width: 480px) {
    width: columnOneOf(1);
  }
}

.grid-item {
  display: block;
  margin-bottom: $gutter;
}

// OTHER STYLES
.grid-img {
  width: 100%;
  display: block;
}

.action-btn {
  box-shadow: 2px 3px 3px 0px rgba(41, 41, 41, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 5rem;
  right: 5rem;
  height: 8rem;
  width: 8rem;
  background-color: rgba(#fff, 0.5);
  border-radius: 50%;
  border: none;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #fff;
  }

  &__icon {
    height: 4.5rem;
    width: 4.5rem;
    fill: #000;
  }
}
</style>
