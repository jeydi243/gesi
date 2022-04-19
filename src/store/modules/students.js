import studentsAPI from "@/api/students"

export default {
  state: () => ({ students: [] }),
  namespaced: true,
  mutations: {
    ALL: (state, data) => {
      data.forEach((element) => {
        state.students.unshift(element)
      })
    },
  },
  actions: {
    init({ dispatch }) {
      dispatch("getAllStudents")
    },
    getAllStudents({ commit, state }) {
      studentsAPI
        .getAll()
        .then((res) => {
          commit("ALL", res.data)
        })
        .catch((err) => {
          console.log("Erro on calling getAllStudents", err)
        })
    },
  },
  getters: {
getListDocuments: (state) => state.listDocuments,    mystudents(state, getters, rootState, rootGetters) {
      return state.students.filter((student) => student.level.toLowerCase() == rootGetters.currentLevelShort.toLowerCase())
    },
  },
}
