import Vue from 'vue'
import Router from 'vue-router'
import mainPage from '@/components/mainPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: mainPage
    }
  ]
})
