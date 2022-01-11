import { createStore } from "vuex"
import room from "./modules/room"
import students from "./modules/students"
import professors from "./modules/professors"

const store = createStore({
  modules: { room: room, students: students, professors: professors },
  state() {
    return {
      count: 0,
      layout: "main",
      rootName: "home",
      listSideMenus: [
        { text: "Home", to: "/", icon: "home", active: true, mouseHover: false },
        { text: "Students", to: "/students", icon: "user-rectangle", active: false, mouseHover: false },
        { text: "Professors", to: "/professors", icon: "adjust", active: false, mouseHover: false },
        { text: "Calendar", to: "/calendar", icon: "message-square", active: false, mouseHover: false },
        { text: "Library", to: "/library", icon: "book", active: false, mouseHover: false },
        { text: "Gestion", to: "/gestion", icon: "book", active: false, mouseHover: false },
      ],
      listLevel: [
        { id: "TmhGq7H", name: "Candidat", short: "Candidat", color: "#8B70D8", current: true },
        { id: "smhsq8g", name: "Préparatoire", short: "Prépa", color: "#8B70D3", current: false },
        { id: "o3ah53j", name: "Graduat 1", short: "G1", color: "#CA3444", current: false },
        { id: "7imqgyt", name: "Graduat 2", short: "G2", color: "#D194F7", current: false },
        { id: "7imy5y7", name: "Graduat 3", short: "G3", color: "#E199F9", current: false },
      ],
      listState: ["Abandon", "Diplomé", "Candidat", "Renvoi"],
    }
  },
  mutations: {
    CHANGE_LAYOUT(state, data) {
      state.layout = data
    },
    CHANGE_ROOT_NAME(state, data) {
      state.rootName = data.toLowerCase()
    },
    CHANGE_ACTIVE_SIDE_MENU(state, path) {
      var currentIndex = state.listSideMenus.findIndex((item) => item.active == true)
      var nextIndex = state.listSideMenus.findIndex((item) => item.to == path)
      state.listSideMenus[currentIndex].active = false
      state.listSideMenus[nextIndex].active = true
    },
    CHANGE_LEVEL_MENU(state, index) {
      console.log("click")
      var currentIndex = state.listLevel.findIndex((tab) => tab.current == true)
      state.listLevel[currentIndex].current = false
      state.listLevel[index].current = true
    },
  },
  actions: {
    init({ dispatch }) {
      dispatch("students/init", {}, { root: true })
    },
    changeLayout({ commit }, data) {
      //   console.log(data)
      commit("CHANGE_LAYOUT", data)
    },
    changeActive({ commit }, path) {
      // console.log(path)
      commit("CHANGE_ACTIVE_SIDE_MENU", path)
    },
  },
  getters: {
    getLayout(state) {
      return state.layout
    },
    getRootName: (state) => state.rootName,
    getListLevel(state) {
      return state.listLevel
    },
    getListSideMenus: (state) => state.listSideMenus,
    currentLevel(state) {
      return state.listLevel.find((tabLevel) => tabLevel.current == true).name
    },
  },
})
store.dispatch("init")
export default store
