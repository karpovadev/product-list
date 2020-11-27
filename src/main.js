import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { VuePicker, VuePickerOption } from "@invisiburu/vue-picker";
import "./less/main.less";
import "@invisiburu/vue-picker/dist/vue-picker.min.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart,
  faStar,
  faTh,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(farHeart, faHeart, faStar, faTh, faBars);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.component("VuePicker", VuePicker);
Vue.component("VuePickerOption", VuePickerOption);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
