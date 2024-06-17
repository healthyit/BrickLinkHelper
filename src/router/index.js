import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/inventory/:filter?',
    name: 'inventory',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "inventory" */ '../views/InventoryView.vue')
  },
  {
    path: '/analytics',
    name: 'analytics',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "analytics" */ '../views/AnalyticsView.vue')
  },
  {
    path: '/user/register/',
    name: 'user_register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "user_register" */ '../views/UserRegisterView.vue')
  },
  {
    path: '/user/login/',
    name: 'user_login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "user_login" */ '../views/UserLoginView.vue')
  },
  {
    path: '/user/logout/',
    name: 'user_logout',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "user_logout" */ '../views/UserLogoutView.vue')
  },
  {
    path: '/user/account/:tab?',
    name: 'user_account',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "user_register" */ '../views/UserAccountView.vue')
  },
  {
    path: '/termsandconditions',
    name: 'termsandconditions',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "termsandconditions" */ '../views/TermsAndConditionsView.vue')
  },
  {
    path: '/privacypolicy',
    name: 'privacypolicy',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "privacypolicy" */ '../views/PrivacyPolicyView.vue')
  },
  {
    path: '/contactus',
    name: 'contactus',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "contactus" */ '../views/ContactUsView.vue')
  },
  {
    path: '/fees',
    name: 'fees',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "fees" */ '../views/FeesView.vue')
  }



  

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
