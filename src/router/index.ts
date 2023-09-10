import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children:[
      {
        path: '/userManagement',
        name: 'userManagement',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/userManagement/UserManagementView.vue')
      },
      {
        path: '/AddUser',
        name: 'AddUser',
        component: () => import( '../views/userManagement/AddUser.vue')
      },
      {
        path: '/EditUser',
        name: 'EditUser',
        component: () => import( '../views/userManagement/EditUser.vue')
      },
      {
        path: '/about',
        name: 'about',
 
        component: () => import('../views/AboutView.vue')
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
