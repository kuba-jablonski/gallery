import Vue from "vue";
import App from "./App.vue";
import firebase from "firebase/app";
import { VueMasonryPlugin } from "vue-masonry";
import store from "./store";
import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.use(VueMasonryPlugin);

var config = {
  storageBucket: "gallery-589e3.appspot.com"
};
firebase.initializeApp(config);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
