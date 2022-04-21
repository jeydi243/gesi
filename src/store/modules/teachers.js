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
    UPDATE: (state, payload) => {
      var foundIndex = state.teachers.findIndex((t) => t.id == payload.idTeacher)
      if (foundIndex) {
        state.teachers[foundIndex] = payload.data
      }
    },
  },
  actions: {
    init({ dispatch }) {
      dispatch("getTeachers")
    },
    getTeachers({ commit, state }) {
      if (state.teachers.length == 0) {
        return teachersAPI
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
    updateTeacher({ commit, state }, { idTeacher, update }) {
      return teachersAPI
        .updateById(idTeacher, update)
        .then(({ status, data }) => {
          if (status < 300) {
            commit("UPDATE", { idTeacher, data })
            return true
          }
          return false
        })
        .catch((err) => {
          console.log(err)
          return false
        })
    },
    addTeacher({ commit, state }, data) {
      return teachersAPI
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
    myteachers: (state) =>
      function (filter) {
        if (filter) {
          return state.teachers.find((professor) => professor.name.toLowerCase().includes(filter.toLowerCase()))
        }
        return state.teachers
      },
  },
}
