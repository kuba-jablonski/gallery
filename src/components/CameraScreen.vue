<template>
  <div class="modal">
    <video v-show="video" class="player" ref="player" autoplay></video>
    <img v-if="image" :src="image" alt="">
    <button v-if="!image" @click="takePicture" id="capture-button">Capture</button>
    <div v-if="!image" class="file-upload">
      <label for="upload" class="file-upload__label">Css only file upload button</label>
      <input @change="onFileChange($event.target.files[0])" id="upload" class="file-upload__input" type="file" name="file-upload">
    </div>
    <button v-if="image" @click="onSave" id="capture-button">Save</button>
    <button v-if="image" @click="reset" id="capture-button">Cancel</button>
  </div>
</template>

<script>
import firebase from "firebase";
import uuid from "uuid/v1";

export default {
  props: ["open"],
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
      // this.convertCanvasToImage(canvas);
    },
    onFileChange(file) {
      const reader = new FileReader();

      reader.onload = e => {
        // this.$emit("onFileChange", {
        //   filename: file.name,
        //   fileSrc: e.target.result
        // });
        this.video = false;
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    async onSave() {
      const storageRef = firebase
        .storage()
        .ref()
        .child("images")
        .child(uuid());
      await storageRef.putString(this.image, "data_url");
      const url = await storageRef.getDownloadURL();
      console.log(url);

      try {
        const res = await fetch(`${process.env.VUE_APP_API_ROOT}/img`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ image: url })
        });

        // console.log(res)
        const data = await res.json();
        console.log(data);

        // if (res.status < 200 || res.status >= 300) {
        //   throw new Error(data.msg);
        // }
      } catch (e) {
        console.log(e);
      }
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
img {
  width: 100%;
  object-fit: cover;
  object-position: center;
}

button {
  width: 50%;
  background-color: #44c767;
  border-radius: 28px;
  border: 1px solid #18ab29;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 17px;
  padding: 14px 43px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #2f6627;

  &:hover {
    background-color: #5cbf2a;
  }

  &:active {
    position: relative;
    top: 1px;
  }
}

.modal {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  max-width: 50rem;
  position: absolute;
  top: 50%;
  left: 50%;
  // min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, -50%);
  width: 100%;
  // background-color: red;
  & > * {
    margin-bottom: 3rem;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
    min-height: 100vh;
  }
}

.container {
  position: relative;
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
  padding: 1em 2em;
  color: #fff;
  background: #222;
  border-radius: 0.4em;
  transition: background 0.3s;

  &:hover {
    cursor: pointer;
    background: #000;
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
