import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "../views/Layout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Layout,
    children: [
      {
        path: "/",
        name: "HomeView",
        component: () => import("../views/home/HomeView.vue"),
      },
      //  user
      {
        path: "/user",
        name: "user",

        component: () => import("../views/user/UserManagementView.vue"),
      },
      {
        path: "/AddUser",
        name: "AddUser",
        component: () => import("../views/user/AddUser.vue"),
      },
      {
        path: "/EditUser",
        name: "EditUser",
        component: () => import("../views/user/EditUser.vue"),
      },
      // 管理员
      {
        path: "/admin",
        name: "admin",

        component: () => import("../views/admin/AdminManagementView.vue"),
      },
      {
        path: "/AddAdmin",
        name: "AddAdmin",
        component: () => import("../views/admin/AddAdmin.vue"),
      },
      {
        path: "/EditAdmin",
        name: "EditAdmin",
        component: () => import("../views/admin/EditAdmin.vue"),
      },

      // 图书分类
      {
        path: "/category",
        name: "category",

        component: () => import("../views/category/CategoryManagementView.vue"),
      },
      {
        path: "/AddCategory",
        name: "AddCategory",
        component: () => import("../views/category/AddCategory.vue"),
      },
      {
        path: "/EditCategory",
        name: "EditCategory",
        component: () => import("../views/category/EditCategory.vue"),
      },

      // 图书管理
      {
        path: "/book",
        name: "book",

        component: () => import("../views/book/BookManagementView.vue"),
      },
      {
        path: "/AddBook",
        name: "AddBook",
        component: () => import("../views/book/AddBook.vue"),
      },
      {
        path: "/EditBook",
        name: "EditBook",
        component: () => import("../views/book/EditBook.vue"),
      },

      // 借书管理
      {
        path: "/borrow",
        name: "borrow",
        component: () => import("../views/borrow/BorrowManagementView.vue"),
      },
      {
        path: "/AddBorrow",
        name: "AddBorrow",
        component: () => import("../views/borrow/AddBorrow.vue"),
      },
      {
        path: "/EditBorrow",
        name: "EditBorrow",
        component: () => import("../views/borrow/EditBorrow.vue"),
      },
      {
        path: "/about",
        name: "about",

        component: () => import("../views/AboutView.vue"),
      },
    ],
  },
  {
    path: "/Login",
    name: "Login",

    component: () => import("../views/login/LoginView.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "404View",
    component: () => import("../views/404View.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.name !== "Login") {
    if (sessionStorage.getItem("admin") === null) {
      next({ name: "Login" });
    }

    next();
  }

  next();
});
export default router;
