import { createStore } from "vuex"
import room from "./modules/room"
import students from "./modules/students"
import teachers from "./modules/teachers"
import courses from "./modules/courses"
import management from "./modules/management"
import authentication from "./modules/authentication"

const store = createStore({
  modules: {
    room: room,
    students: students,
    teachers: teachers,
    courses: courses,
    authentication: authentication,
    management: management,
  },
  state() {
    return {
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
    }
  },
  mutations: {
    CHANGE_LAYOUT(state, data) {
      state.layout = data
    },
    SET_ROOT_NAME(state, name) {
      state.rootName = name
    },
    CHANGE_ACTIVE_SIDE_MENU(state, path) {
      var currentIndex = state.listSideMenus.findIndex((item) => item.active == true)
      var nextIndex = state.listSideMenus.findIndex((item) => item.to == path)
      if (nextIndex != -1) {
        if (currentIndex != -1) {
          state.listSideMenus[currentIndex].active = false
        }
        state.listSideMenus[nextIndex].active = true
      } else {
        state.listSideMenus[currentIndex].active = false
      }
    },
    CHANGE_LEVEL_MENU(state, index) {
      var currentIndex = state.listLevel.findIndex((tab) => tab.current == true)
      state.listLevel[currentIndex].current = false
      state.listLevel[index].current = true
    },
  },
  actions: {
    init({ dispatch }) {
      dispatch("students/init", {}, { root: true })
      dispatch("management/init", {}, { root: true })
    },
    changeLayout({ commit }, data) {
      commit("CHANGE_LAYOUT", data)
    },
    changeActive({ commit }, name) {
      commit("CHANGE_ACTIVE_SIDE_MENU", "/" + name)
      commit("SET_ROOT_NAME", name)
    },
  },
  getters: {
    getLayout: (state) => state.layout,
    getConfig: (state) => state.config,
    getRootName: (state) => state.rootName,
    getListLevel: (state) => state.listLevel,
    getListStatus: (state) => state.listStatus,
    getListSideMenus: (state) => state.listSideMenus,

    currentLevel(state) {
      return state.listLevel.find((tabLevel) => tabLevel.current == true).name
    },
    currentLevelShort(state) {
      return state.listLevel.find((tabLevel) => tabLevel.current == true).short
    },
  },
})

export default store
