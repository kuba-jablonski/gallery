<template>
  <div class="modal">
    <!-- <div class="container"> -->
      <video v-if="video" class="player" ref="player" autoplay></video>
      <!-- <canvas ref="canvas"></canvas> -->
    <!-- </div> -->
    <img :src="image" alt="">
    <button @click="doit" id="capture-button">Capture</button>

  </div>
</template>

<script>
export default {
  props: ["open"],
  data() {
    return {
      player: this.$refs.player,
      canvas: this.$refs.canvas,
      video: true,
      image: null
    };
  },
  methods: {
    doit() {
      // const canvas = this.$refs.canvas
      const player = this.$refs.player;
      var canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      context.canvas.width = window.innerWidth;
      context.canvas.height = window.innerWidth * 0.75;
      context.drawImage(
        player,
        0,
        0,
        canvas.width,
        player.videoHeight / (player.videoWidth / canvas.width)
      );
      this.video = false;
      this.convertCanvasToImage(canvas);
      // context.drawImage(player, 0, 0, canvas.width, player.videoHeight / (player.videoWidth / canvas.width));
    },
    convertCanvasToImage(canvas) {
      // var image = new Image();
      const data = canvas.toDataURL("image/png");
      console.log(data);
      // console.log(image)
      this.image = data;
    }
  },
  mounted() {
    const player = this.$refs.player;
    console.log(player.height);
    console.log(player.width);

    if (!("mediaDevices" in navigator)) {
      navigator.mediaDevices = {};
    }

    if (!("getUserMedia" in navigator.mediaDevices)) {
      navigator.mediaDevices.getUserMedia = function(constraints) {
        var getUserMedia =
          navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        if (!getUserMedia) {
          return Promise.reject(new Error("getUserMedia is not implemented!"));
        }

        return new Promise(function(resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function(stream) {
        player.srcObject = stream;
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}

.modal {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100vh;
  width: 100%;
  background-color: transparent;
}

.container {
  position: relative;
}

.player {
  width: 100%;
}

.canvas {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  height: 100%;
}
</style>
