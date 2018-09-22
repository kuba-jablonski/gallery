import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import uuid from "uuid/v1";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    images: []
  },
  mutations: {
    addImages(state, payload) {
      state.images = state.images.concat(payload);
    }
  },
  actions: {
    async fetchImages({ commit }) {
      try {
        const res = await fetch(`${process.env.VUE_APP_API_ROOT}/img`);
        const data = await res.json();

        commit("addImages", data);
      } catch (e) {
        console.log(e);
      }
    },
    async saveImage({ commit }, image) {
      const storageRef = firebase
        .storage()
        .ref()
        .child("images")
        .child(uuid());
      await storageRef.putString(image, "data_url");
      const url = await storageRef.getDownloadURL();

      try {
        const res = await fetch(`${process.env.VUE_APP_API_ROOT}/img`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ image: url })
        });

        const data = await res.json();
        commit("addImages", data);
      } catch (e) {
        console.log(e);
      }
    }
  }
});
