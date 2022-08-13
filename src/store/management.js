import mgntAPI from "@/api/management"
import teachersAPI from "@/api/teachers"
import coursesAPI from "@/api/courses"
import axios from "@/api/config"
import { toast } from "@/utils/utils"
import { defineStore } from "pinia"
import { useTeachers } from "./teachers"
// import { useCourses } from "./courses"
export const useManagement = defineStore("management", {
  state: () => ({
    courses: [],
    laptops: [],
    routeurs: [],
    listDocuments: [],
    employees: [],
    token: null,
    error: null,
  }),

  actions: {
    async init() {
      const t = useTeachers()
      //   const c = useCourses()
      this.setAxios()
      this.getAllDocuments()
      this.getAllEmployees()
      t.init()
      //   c.init()
    },
    async getAllDocuments() {
      try {
        const { data, status } = await mgntAPI.getDocuments()
        if (status == 200 || status == 201) {
          data
            .map((doc) => {
              doc["show"] = false
              return doc
            })
            .forEach((doc) => this.listDocuments.unshift(doc))
          return true
        }

        return false
      } catch (er) {
        console.log(err)
      }
    },
    async getAllEmployees() {
      this.employees = []
      try {
        const { data, status } = await mgntAPI.getEmployees()
        if (status == 200 || status == 201) {
          console.log({ employees: data })
          if (data.length > 0) {
            data.forEach((employee) => {
              this.employees.unshift(employee)
              setTimeout(() => {}, 1000)
            })
          } else {
            this.employees = data
          }
          return true
        }
        return false
      } catch (er) {
        console.log(er)
      }
    },
    async deleteExperience() {
      try {
        const { data, status } = await mgntAPI.deleteExperience()
        if (status == 200 || status == 201) {
          const index = userData.value.educations.findIndex((educ) => (educ.id = educationID))
          userData.value.educations.splice(index, 1)
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },
    setAxios({ state, commit }) {
      axios.interceptors.request.use(
        function (config) {
          if (state.token) {
            config.headers.Authorization = `Bearer ${state.token}`
          }
          return config
        },
        function onRejected(error) {
          // Do something with request error
          return Promise.reject(error)
        },
        { synchronous: true }
      )
      axios.interceptors.response.use(
        function (response) {
          //   console.info(`[AXIOS] Response status ${response.status}`)
          return response
        },
        function (error) {
          //   console.error(`[AXIOS] Error ${JSON.stringify(error.response)}`)
          //   if (error.code == "ECONNABORTED") {
          //     toast.error("La requete a pris trop de temps. Verifier votre connexion et retenter dans quelques temps", {
          //       type: "error",
          //       duration: 50000,
          //       singleton: true,
          //       action: {
          //         text: "Relancer la page",
          //         onClick: (e, toastObject) => {
          //           console.log("Relaod after error")
          //           router.go()
          //         },
          //       },
          //     })
          //     console.log({ error })
          //   } else if (error.code === "ERR_CONNECTION_REFUSED") {
          //     console.log("[ECONNABORTED] Impossible de contacter le serveur :", {
          //       error,
          //     })
          //     router.push({ name: "error" })
          //   } else if (error.code === "ERR_FAILED") {
          //     console.log("[ERR_FAILED] Impossible de contacter le serveur :", {
          //       error,
          //     })
          //     router.push({ name: "error" })
          //   } else {
          console.log("Error code:", JSON.stringify(error))
          commit("SET_ERROR", error.response.data)
          //   }
          return Promise.reject(error)
        }
      )
    },
    async addEmployee(newEmployee) {
      try {
        const { data, status } = await mgntAPI.addEmployee(newEmployee)
        if (status == 200 || status == 201) {
          this.employees.unshift({ ...data, show: false })
          return true
        }
        console.log(data)
        return false
      } catch (er) {
        console.log(er)
      }
    },

    async addDocument(newDocument) {
      try {
        const { data, status } = await mgntAPI.addDocument(newDocument)
        if (status == 200 || status == 201) {
          this.listDocuments.unshift({ ...data, show: false })
          return true
        }
        console.log(data)
        return false
      } catch (er) {
        console.log(er)
      }
    },
    async removeDocument(idDocument) {
      try {
        const { data, status } = await mgntAPI.removeDocument(idDocument)
        if (status == 200 || status == 201) {
          var index = this.listDocuments.findIndex((doc) => doc.idDocument == idDocument)
          this.listDocuments.splice(index, 1)
          console.log(data)
          return true
        }
        return false
      } catch (er) {
        console.log(er)
      }
    },
    async deleteDocument(code) {
      try {
        const { data, status } = await mgntAPI.softDeleteDocument(code)
        if (status == 200 || status == 201) {
          var index = this.listDocuments.findIndex((doc) => doc.code == code)
          this.listDocuments.splice(index, 1)
          console.log(data)
          return true
        }
        return false
      } catch (er) {
        console.log(er)
      }
    },
    async updateDocument(newValues) {
      try {
        const { data, status } = await mgntAPI.updateDocument(newValues)
        if (status < 300) {
          var index = this.listDocuments.findIndex((doc) => doc.code == data.code)
          this.listDocuments[index] = newDoc
          console.log(data)
          return true
        }
        return false
      } catch (er) {
        console.log(er)
      }
    },
    async addFiliere(newFiliere) {
      try {
        const { data, status } = await mgntAPI.addFiliere(newFiliere)
        if (status < 300) {
          this.listFilieres.unshift({ ...data, show: false })
          return true
        }
        console.log(data)
      } catch (er) {
        console.log(er)
      }
    },
    async removeFiliere(idFiliere) {
      try {
        const { data, status } = await mgntAPI.removeFiliere(idFiliere)
        if (status == 200 || status == 201) {
          var index = this.listFilieres.findIndex((filiere) => filiere.id == data.id)
          this.listFilieres.splice(index, 1)
          console.log(data)
          return true
        }
        return false
      } catch (er) {
        console.log(err)
      }
    },
    async updateFiliere(newValues) {
      try {
        const { data, status } = await mgntAPI.updateFiliere(newValues)
        if (status == 200 || status == 201) {
          const index = this.listFilieres.findIndex((filiere) => filiere.id == data.id)
          this.listFilieres[index] = data
          return true
        }
        return false
      } catch (er) {
        console.log(err)
      }
    },
  },
  getters: {
    getCars: (state) => state.cars,
    getCourses: (state) => state.courses,
    getEmployees: (state) => state.employees,
    getLaptops: (state) => state.laptops,
    getRouteurs: (state) => state.routeurs,
    getListDocuments: (state) => state.listDocuments,
    errorCall: (state) => state.error,
  },
})
