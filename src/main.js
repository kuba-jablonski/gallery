import Vue from "vue";
import App from "./App.vue";
import firebase from "firebase";
import store from "./store";
import "./registerServiceWorker";

Vue.config.productionTip = false;

var config = {
  apiKey: "AIzaSyAcs817uj7aGl3XFZNipOJtuzdCt4VYqVs",
  authDomain: "gallery-589e3.firebaseapp.com",
  databaseURL: "https://gallery-589e3.firebaseio.com",
  projectId: "gallery-589e3",
  storageBucket: "gallery-589e3.appspot.com",
  messagingSenderId: "89490490821"
};
firebase.initializeApp(config);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
