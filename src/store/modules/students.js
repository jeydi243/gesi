import studentsAPI from "@/api/students"

export default {
  state: () => ({ students: [] }),
  namespaced: true,
  mutations: {
    ALL: (state, data) => {
      console.log("ban kudu")
      data.forEach((element) => {
        setTimeout(() => {
          state.students.unshift(element)
        }, 1000)
      })

      console.log("fffff: ", state.students)
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
