require('./bootstrap');

/* Core */
import Vue from 'vue'
import Buefy from 'buefy'

/* Buefy */
Vue.use(Buefy)

/* Router & Store */
import router from './router'
import store from './store'

/* Vue. Main component */
import App from './App.vue'

Vue.config.productionTip = false

/* These components are used in recursion algorithm */
Vue.component('AsideMenuList', AsideMenuList)

/* Main component */
Vue.component('App', App)

/* Vue. Component in recursion */
import AsideMenuList from '@/components/AsideMenuList'

/* Collapse mobile aside menu on route change */
router.afterEach(() => {
  store.commit('asideMobileStateToggle', false)
})

Vue.config.productionTip = false



/* This is main entry point */

new Vue({
  store,
  router,
  render: h => h(App),
  mounted() {
    document.documentElement.classList.remove('has-spinner-active')
  }
}).$mount('#app')