import { createRouter, createWebHistory, isNavigationFailure, NavigationFailureType } from "vue-router"

const studentsRoutes = [
	{
		path: "/students",
		meta: { layout: "main" },
		name: "index-students",
		component: () => import(/* webpackChunkName: "index-students" */ "./views/students/index.vue"),
	},
	{
		path: "/students/add",
		meta: { layout: "main" },
		name: "students-add",
		component: () => import(/* webpackChunkName: "add-students" */ "./views/students/add.vue"),
	},
	{
		path: "/students/:id",
		meta: { layout: "main" },
		name: "students-details",
		component: () => import(/* webpackChunkName: "details-student" */ "./views/students/details.vue"),
	},
]
const teachersRoutes = [
	{
		path: "/teachers",
		meta: { layout: "main" },
		name: "index-teachers",
		component: () => import(/* webpackChunkName: "index-teacher" */ "./views/teachers/index.vue"),
	},
	//   {
	//     path: "/teachers/add",
	//     meta: { layout: "main" },
	//     name: "teachers-add",
	//     component: () => import(/* webpackChunkName: "add-teacher" */ "./views/teachers/add.vue"),
	//   },
	//   {
	//     path: "/teachers/:id",
	//     meta: { layout: "main" },
	//     name: "teachers-details",
	//     component: () => import(/* webpackChunkName: "details-teacher" */ "./views/teachers/details.vue"),
	//   },
]
const calendarRoutes = [
	{
		path: "/calendar",
		meta: { layout: "main" },
		name: "index-calendar",
		component: () => import(/* webpackChunkName: "index-calendar" */ "./views/calendar/index.vue"),
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

const employeesRoutes = {
	path: "employees",
	meta: { layout: "main" },
	name: "employees-index",
	component: () => import(/* webpackChunkName: "employees" */ "./views/management/employees/index.vue"),
	children: [
		{
			path: "list",
			name: "employees-list",
			component: () => import(/* webpackChunkName: "employees" */ "./views/management/employees/list.vue"),
		},
		{
			path: "add",
			name: "employees-add",
			component: () => import(/* webpackChunkName: "employees" */ "./views/management/employees/add.vue"),
		},
		{
			path: ":id",
			name: "employees-details",
			component: () => import(/* webpackChunkName: "employees" */ "./views/management/employees/details_emp.vue"),
		},
		{
			path: "update/:id",
			name: "employees-update",
			component: () => import(/* webpackChunkName: "employees" */ "./views/management/employees/update.vue"),
		},
	],
}

const coursesRoutes = {
	path: "courses",
	meta: { layout: "main" },
	name: "courses-index",
	component: () => import(/* webpackChunkName: "courses" */ "./views/management/courses/list.vue"),
	children: [
		{
			path: "add",
			name: "courses-add",
			component: () => import(/* webpackChunkName: "courses" */ "./views/management/courses/add.vue"),
		},
		{
			path: "details/:id",
			name: "courses-details",
			component: () => import(/* webpackChunkName: "courses" */ "./views/management/courses/details.vue"),
		},
	],
}

const managementRoutes = [
	{
		path: "/management",
		meta: { layout: "main" },
		name: "index-management",
		component: () => import(/* webpackChunkName: "management" */ "./views/management/index.vue"),
		children: [
			employeesRoutes,
			coursesRoutes,
			{
				path: "academique",
				meta: { layout: "main" },
				name: "academique-index",
				component: () => import(/* webpackChunkName: "management" */ "./views/management/academique.vue"),
			},
			{
				path: "filieres",
				meta: { layout: "main" },
				name: "filieres-index",
				component: () => import(/* webpackChunkName: "management" */ "./views/management/filieres.vue"),
			},
			{
				path: "documents",
				meta: { layout: "main" },
				name: "documents-index",
				component: () => import(/* webpackChunkName: "management" */ "./views/management/documents.vue"),
			},
		],
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
	...teachersRoutes,
	...calendarRoutes,
	...libraryRoutes,
	...settingsRoutes,
	...managementRoutes,
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

router.onError((error) => {
	console.error(error)
})

router.afterEach((to, from, failure) => {
	if (isNavigationFailure(failure, NavigationFailureType.redirected)) {
		console.error(`Failed navigation \nVous avez été redirigé vers ${to.path}`, failure.message)
	} else if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
		console.error(`La navigation a été empêchée parce que tu tente d'aller à la meme route ${failure.to.path} .`)
	} else if (isNavigationFailure(failure, NavigationFailureType.cancelled)) {
		console.error(`${failure.message}.`)
	} else {
		// console.info(`From: ${from.name} to: ${to.name} ${to.params != null ? JSON.stringify(to.params) : ""}`)
	}
})
export default router
