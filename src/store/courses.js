import coursesAPI from "@/api/courses"

export default {
  state: () => ({ courses: [] }),
  namespaced: true,
  mutations: {
    ALL: (state, data) => {
      data.forEach((element) => {
        setTimeout(() => {
          state.courses.unshift(element)
        }, 1000)
      })
    },
    UPDATE: (state, payload) => {
      var foundIndex = state.courses.findIndex((t) => t.id == payload.idCourse)
      if (foundIndex) {
        state.courses[foundIndex] = payload.data
      }
    },
  },
  actions: {
    init({ dispatch }) {
      dispatch("getcourses")
    },
    getcourses({ commit, state }) {
      if (state.courses.length == 0) {
        return coursesAPI
          .getAll()
          .then(({ data, status }) => {
            commit("ALL", data)
            console.log(data)
            if (status < 300) {
              return true
            }
            return false
          })
          .catch((err) => {
            console.log(err)
            return false
          })
      }
    },
    updateCourse({ commit, state }, { idCourse, update }) {
      return coursesAPI
        .updateById(idCourse, update)
        .then(({ status, data }) => {
          if (status < 300) {
            commit("UPDATE", { idCourse, data })
            return true
          }
          return false
        })
        .catch((err) => {
          console.log(err)
          return false
        })
    },
    addCourse({ commit, state }, data) {
      return coursesAPI
        .add(data)
        .then(({ status, data }) => {
          if (status < 300) {
            commit("ADD", data)
            return true
          }
          return false
        })
        .catch((err) => {
          console.log(err)
          return false
        })
    },
  },
  getters: {
    mycourses: (state) =>
      function (filter) {
        if (filter) {
          return state.courses.find((professor) => professor.name.toLowerCase().includes(filter.toLowerCase()))
        }
        return state.courses
      },
  },
}
