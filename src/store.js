import Vue from "vue";
import Vuex from "vuex";

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
    }
  }
});
