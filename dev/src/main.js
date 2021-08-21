import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/store";
require('@/assets/main.scss');
require('@/assets/darkly.min.css');

createApp(App).use(store).mount("#app");
