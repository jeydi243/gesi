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
      dispatch("getStudents")
    },
    getStudents({ commit, state }) {
      if (state.students.length == 0) {
        studentsAPI
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
    mystudents: function (state) {
      return state.students
    },
    myStudentsByLevel: (state) => (level) => state.students.filter((student) => student.level == level),
  },
}
