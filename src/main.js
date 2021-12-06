import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

Vue.config.productionTip = false

import './config'
// import '@fortawesome/fontawesome-free/css/all.min.css'
// import 'bootstrap-css-only/css/bootstrap.min.css'
// import 'mdbvue/lib/css/mdb.min.css'

// import 'jquery/dist/jquery.min.js'
// import '@popperjs/core'

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
