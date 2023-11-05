import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../views/Layout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    children:[
      {
        path: '/',
        name: 'HomeView',
        component: () => import('../views/home/HomeView.vue')
      },
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
  {
    path: '/Login',
    name: 'Login',

    component: () => import('../views/login/LoginView.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: "404View",
    component: () => import('../views/404View.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next)=>{
  if(to.name !== 'Login'){
    if(sessionStorage.getItem('admin') === null){
      next({name: 'Login'})
    }

    next()
  }

  next()
  
})
export default router
