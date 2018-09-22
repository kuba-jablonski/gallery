<template>
  <div @click.stop class="modal">
    <video v-show="video" class="player" ref="player" autoplay></video>
    <img class="preview" v-if="image" :src="image" alt="Image preview">
    <base-button color="success" v-if="!image" @click="takePicture">Take picture</base-button>
    <div v-if="!image" class="file-upload">
      <label for="upload" class="file-upload__label">Upload file</label>
      <input @change="onFileChange($event.target.files[0])" id="upload" class="file-upload__input" type="file" name="file-upload">
    </div>
    <base-button color="success" v-if="image" @click="onSave">Save</base-button>
    <base-button color="error" v-if="image" @click="reset">Cancel</base-button>
  </div>
</template>

<script>
import BaseButton from "@/components/BaseButton";

export default {
  components: {
    BaseButton
  },
  data() {
    return {
      video: true,
      image: null
    };
  },
  methods: {
    reset() {
      this.image = null;
      this.video = true;
    },
    takePicture() {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      context.canvas.width = window.innerWidth;
      context.canvas.height = window.innerWidth * 0.75;
      context.drawImage(
        this.$refs.player,
        0,
        0,
        canvas.width,
        this.$refs.player.videoHeight /
          (this.$refs.player.videoWidth / canvas.width)
      );
      this.video = false;
      this.image = canvas.toDataURL("image/png");
    },
    onFileChange(file) {
      console.log("running");
      const reader = new FileReader();

      reader.onload = e => {
        this.video = false;
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    onSave() {
      this.$store.dispatch("saveImage", this.image);
    }
  },
  mounted() {
    const player = this.$refs.player;

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
.preview {
  max-height: 40rem;
  max-width: 100%;
  object-fit: cover;
  object-position: center;
}

.modal {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  max-width: 50rem;
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, -50%);
  width: 100%;
  background-color: #fff;
  & > * {
    margin-bottom: 3rem;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
    min-height: 100vh;
  }
}

.player {
  max-width: 100%;
  width: 50rem;
}

/*****************************************
  upload button styles
******************************************/
.file-upload {
  position: relative;
  display: inline-block;
}

.file-upload__label {
  display: block;
  padding: 1rem 3rem;
  position: relative;
  font-family: inherit;
  font-size: 1.6rem;
  border: none;
  outline: none;
  color: #fff;
  background-color: $color-success;
  cursor: pointer;
  display: flex;
  min-width: 20rem;
  height: 4.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: $color-success-light;
  }
}

.file-upload__input {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  font-size: 1;
  width: 0;
  height: 100%;
  opacity: 0;
}
</style>
