import teachersAPI from "@/api/teachers"

export default {
  state: () => ({ teachers: [] }),
  namespaced: true,
  mutations: {
    ALL: (state, data) => {
      data.forEach((element) => {
        setTimeout(() => {
          state.teachers.unshift(element)
        }, 1000)
      })
    },
  },
  actions: {
    init({ dispatch }) {
      dispatch("getTeachers")
    },
    getProfs({ commit, state }) {
      if (state.teachers.length == 0) {
        teachersAPI
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
    myteachers: (state) =>
      function (filter) {
        if (filter) {
          return state.teachers.find((professor) => professor.name.toLowerCase().includes(filter.toLowerCase()))
        }
        return state.teachers
      },
  },
}
