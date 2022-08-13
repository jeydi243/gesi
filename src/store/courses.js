import coursesAPI from "@/api/courses"
import { defineStore } from "pinia"

export const useCourses = defineStore("courses", {
  state: () => ({ courses: [] }),
  actions: {
    async init() {
      try {
        await this.getcourses()
      } catch (er) {
        console.log("Error initializing: ", er)
      }
    },
    async getcourses() {
      try {
        const { data, status } = await coursesAPI.getAll()
        if (status || 200 || status == 201) {
          console.log(data)
          data.forEach((element) => {
            this.courses.unshift(element)
            setTimeout(() => {}, 1000)
          })
          return true
        }
        return false
      } catch (er) {
        console.log(er)
      }
    },
    async updateCourse({ idCourse, update }) {
      try {
        const { status, data } = await coursesAPI.updateById(idCourse, update)
        if (status == 200 || status == 201) {
          commit("UPDATE", { idCourse, data })
          var foundIndex = this.courses.findIndex((t) => t.id == data.idCourse)
          if (foundIndex) {
            this.courses[foundIndex] = data
          }
          return true
        }
        return false
      } catch (er) {
        console.log(er)
      }
    },
    async addCourse(course) {
      try {
        const { status, data } = await coursesAPI.add(course)
        if (status == 200 || status == 201) {
          this.courses.unshift(data)
          return true
        }
        return false
      } catch (er) {
        console.log(er)
      }
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
})
