import { defineStore } from "pinia"
import { useManagement } from "./management"
import { useStudents } from "./students"
import configAPI from "@/api/config"
export const useConfig = defineStore("config", {
	state: () => ({
		count: 0,
		organizations: [],
		layout: "main",
		config: {},
		listSideMenus: [
			{ text: "Home", to: "/home", icon: "home", active: true, mouseHover: false },
			{ text: "Students", to: "/students", icon: "group", active: false, mouseHover: false },
			{ text: "Teachers", to: "/teachers", icon: "adjust", active: false, mouseHover: false },
			{ text: "Calendar", to: "/calendar", icon: "message-square", active: false, mouseHover: false },
			{ text: "Library", to: "/library", icon: "library", active: false, mouseHover: false },
			{ text: "Management", to: "/management", icon: "book", active: false, mouseHover: false },
			{ text: "Settings", to: "/settings", icon: "cog", active: false, mouseHover: false },
		],
		listLevel: [
			{ id: "TmhGq7H", name: "Candidat", short: "Candidat", color: "#8B70D8", current: true },
			{ id: "smhsq8g", name: "Préparatoire", short: "Prépa", color: "#8B70D3", current: false },
			{ id: "o3ah53j", name: "Graduat 1", short: "G1", color: "#CA3444", current: false },
			{ id: "7imqgyt", name: "Graduat 2", short: "G2", color: "#D194F7", current: false },
			{ id: "7imy5y7", name: "Graduat 3", short: "G3", color: "#E199F9", current: false },
		],
		listStatus: ["Etudiant", "Abandon", "Diplomé", "Candidat", "Renvoi"],
	}),

	actions: {
		async init() {
			const students = useStudents()
			const mngt = useManagement()
			try {
				await mngt.init()
				await students.init()
			} catch (error) {
				console.log(error)
			}
		},
		async addOrg(payload) {
			try {
				const { data, status } = configAPI.add(payload)
				console.log({ data }, { status })
				if (status == 200 || status == 201) {
					this.organizations.unshift(data)
				}
			} catch (error) {
				console.log("Can't add organization: ", error)
			}
		},
		async getOrgs() {
			try {
				const { data, status } = configAPI.getAll()
				console.log({ data }, { status })
				if (status == 200 || status == 201) {
					data.forEach((element) => {
						this.organizations.unshift(element)
					})
				}
			} catch (error) {
				console.log("Can't retrieve all organizations: ", error)
			}
		},
		changeLayout(data) {
			this.layout = data
		},
		changeActive(path) {
			var currentIndex = this.listSideMenus.findIndex((item) => item.active == true)
			var nextIndex = this.listSideMenus.findIndex((item) => item.to == path)
			if (nextIndex != -1) {
				// if we came from a page which is not in the list of side menus, we need to add it
				if (currentIndex != -1) {
					this.listSideMenus[currentIndex].active = false
				}
				this.listSideMenus[nextIndex].active = true
			} else {
				this.listSideMenus[currentIndex].active = false
			}
		},
	},
	getters: {
		rootOrg: (state) => state.organizations.find((org) => org.organization_parent_id == null),
		getLayout: (state) => state.layout,
		getConfig: (state) => state.config,
		getListLevel: (state) => state.listLevel,
		getListStatus: (state) => state.listStatus,
		currentLevel(state) {
			return state.listLevel.find((tabLevel) => tabLevel.current == true).name
		},
		sideActive(state) {
			return state.listSideMenus.find((side) => side.active == true)
		},
		currentLevelShort(state) {
			return state.listLevel.find((tabLevel) => tabLevel.current == true).short
		},
	},
})
