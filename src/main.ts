import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './plugins/i18n'
import 'bootstrap'
import {createPinia} from 'pinia'
import axios from 'axios'

const pinia = createPinia()

axios.defaults.baseURL = window.location.origin
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'application/json;charset=UTF-8'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

createApp(App)
  .use(i18n)
  .use(pinia)
  .use(router)
  .provide('appName', process.env.VUE_APP_TITLE)
  .mount('#app')
  
  