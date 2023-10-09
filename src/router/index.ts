import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children:[
      //  user 
      {
        path: '/user',
        name: 'user',
        
        component: () => import('../views/user/UserManagementView.vue')
      },
      {
        path: '/AddUser',
        name: 'AddUser',
        component: () => import( '../views/user/AddUser.vue')
      },
      {
        path: '/EditUser',
        name: 'EditUser',
        component: () => import( '../views/user/EditUser.vue')
      },
      // 管理员 
      {
        path: '/admin',
        name: 'admin',
      
        component: () => import( '../views/admin/AdminManagementView.vue')
      },
      {
        path: '/AddAdmin',
        name: 'AddAdmin',
        component: () => import( '../views/admin/AddAdmin.vue')
      },
      {
        path: '/EditAdmin',
        name: 'EditAdmin',
        component: () => import( '../views/admin/EditAdmin.vue')
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
