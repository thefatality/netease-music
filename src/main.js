import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './css/reset.css'
import './css/theme.less'
import 'swiper/css/swiper.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3000'

axios.interceptors.response.use((response) => {
  const { data } = response
  if (data.code === 200) {
    return data
  }
})

Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
