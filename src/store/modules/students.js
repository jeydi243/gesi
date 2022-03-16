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
    getAllStudents({ commit, state }) {
      //   if (state.students.length == 0) {
      studentsAPI
        .getAll()
        .then(({ data, status }) => {
          console.log(data)
        //   commit("ALL", data)
        })
        .catch((err) => {
          console.log(err)
        })
      //   }
    },
  },
  getters: {
    mystudents: function (state) {
      return state.students
    },
    myStudentsByLevel: (state) => (level) => state.students.filter((student) => student.level == level),
  },
}
