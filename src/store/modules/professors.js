import profsAPI from "@/api/professors"

export default {
  state: () => ({ professors: [] }),
  namespaced: true,
  mutations: {
    ALL: (state, data) => {
      data.forEach((element) => {
        setTimeout(() => {
          state.professors.unshift(element)
        }, 1000)
      })
    },
  },
  actions: {
    init({ dispatch }) {
      dispatch("getprofessors")
    },
    getProfs({ commit, state }) {
      if (state.professors.length == 0) {
        professorsAPI
          .getAll()
          .then(({ data }) => {
            commit("ALL", data)
            console.log(data)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
  },
  getters: {
    myprofessors: (state) =>
      function (filter) {
        if (filter) {
          return state.professors.find((professor) => professor.name.toLowerCase().includes(filter.toLowerCase()))
        }
        return state.professors
      },
  },
}
