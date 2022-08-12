import { defineStore } from "pinia"
import room from "./room"
import students from "./students"
import teachers from "./teachers"
import courses from "./courses"
import authentication from "./authentication"
import { useManagement } from "./management"

export const useConfig = defineStore("config", {
  state: () => ({
    count: 0,
    layout: "main",
    rootName: "home",
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
      } catch (error) {}
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
    getLayout: (state) => state.layout,
    getConfig: (state) => state.config,
    getRootName: (state) => state.rootName,
    getListLevel: (state) => state.listLevel,
    getListStatus: (state) => state.listStatus,
    currentLevel(state) {
      return state.listLevel.find((tabLevel) => tabLevel.current == true).name
    },
    currentLevelShort(state) {
      return state.listLevel.find((tabLevel) => tabLevel.current == true).short
    },
  },
})
