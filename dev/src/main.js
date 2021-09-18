import { createApp } from "vue"
import App from "./App.vue"
import store from "./store/store"
require('@/assets/css/main.scss')
//require('@/assets/css/bulma.scss')
require('@/assets/css/darkly.min.css')
require('@/assets/css/all.min.css')

createApp(App).use(store).mount("#app")
