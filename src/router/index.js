import { createRouter, createWebHistory } from "vue-router"
const studentsRoutes = [
  {
    path: "/students",
    meta: { layout: "main" },
    name: "index-students",
    component: () => import(/* webpackChunkName: "about" */ "./views/students/index.vue"),
  },
  {
    path: "/students/add",
    meta: { layout: "main" },
    name: "students-add",
    component: () => import(/* webpackChunkName: "about" */ "./views/students/add.vue"),
  },
  {
    path: "/students/:id",
    meta: { layout: "main" },
    name: "students-details",
    component: () => import(/* webpackChunkName: "about" */ "./views/students/details.vue"),
  },
]
const professorsRoutes = [
  {
    path: "/professors",
    meta: { layout: "main" },
    name: "index-professors",
    component: () => import(/* webpackChunkName: "about" */ "./views/professors/index.vue"),
  },
  //   {
  //     path: "/professors/add",
  //     meta: { layout: "main" },
  //     name: "professors-add",
  //     component: () => import(/* webpackChunkName: "about" */ "./views/professors/add.vue"),
  //   },
  //   {
  //     path: "/professors/:id",
  //     meta: { layout: "main" },
  //     name: "professors-details",
  //     component: () => import(/* webpackChunkName: "about" */ "./views/professors/details.vue"),
  //   },
]
const calendarRoutes = [
  {
    path: "/calendar",
    meta: { layout: "main" },
    name: "index-calendar",
    component: () => import(/* webpackChunkName: "about" */ "./views/calendar/index.vue"),
  },
]
const libraryRoutes = [
  {
    path: "/library",
    meta: { layout: "main" },
    name: "index-library",
    component: () => import(/* webpackChunkName: "about" */ "./views/library/index.vue"),
  },
]
const settingsRoutes = [
  {
    path: "/settings",
    meta: { layout: "main" },
    name: "index-settings",
    component: () => import(/* webpackChunkName: "about" */ "./views/settings/index.vue"),
  },
]
const managementRoutes = [
  {
    path: "/management",
    meta: { layout: "main" },
    name: "index-management",
    component: () => import(/* webpackChunkName: "about" */ "./views/management/index.vue"),
  },
]

const routes = [
  {
    path: "/home",
    alias: "/",
    name: "home",
    default: true,
    meta: { layout: "main" },
    component: () => import(/* webpackChunkName: "about" */ "./views/account/home.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "auth" },
    component: () => import(/* webpackChunkName: "login" */ "./views/account/login.vue"),
  },
  {
    path: "/profile",
    meta: { layout: "main" },
    name: "profile",
    component: () => import(/* webpackChunkName: "profile" */ "./views/account/profile.vue"),
  },
  {
    path: "/search",
    meta: { layout: "main" },
    name: "search",
    component: () => import(/* webpackChunkName: "search" */ "./views/account/search.vue"),
  },
  ...studentsRoutes,
  ...professorsRoutes,
  ...calendarRoutes,
  ...libraryRoutes,
  ...settingsRoutes,
  ...managementRoutes,
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
export default router
