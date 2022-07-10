import mgntAPI from "@/api/management"
import teachersAPI from "@/api/teachers"
import coursesAPI from "@/api/courses"
import axios from "@/api/config"
import { toast } from "@/utils/utils"

export default {
  state: () => ({
    courses: [],
    laptops: [],
    routeurs: [],
    listDocuments: [],
    listEmployees: [],
    employees: [],
    token: null,
    error: null,
  }),
  namespaced: true,
  mutations: {
    SET_LIST_DOCUMENTS(state, documents) {
      state.listDocuments = documents.map((ele) => {
        ele["show"] = false
        return ele
      })
    },
    SET_LIST_COURSES(state, courses) {
      state.courses = courses
    },
    SET_LIST_TEACHERS(state, teachers) {
      state.teachers = teachers
    },
    SET_LIST_EMPLOYEES(state, employees) {
      state.employees = employees
    },

    ADD_DOCUMENT(state, document) {
      state.listDocuments.unshift({ ...document, show: false })
    },
    REMOVE_DOCUMENT(state, code) {
      var index = state.listDocuments.findIndex((doc) => doc.code == code)
      state.listDocuments.splice(index, 1)
    },
    UPDATE_DOCUMENT(state, { newDoc }) {
      var index = state.listDocuments.findIndex((doc) => doc.code == newDoc.code)
      state.listDocuments[index] = newDoc
    },
    SET_ERROR(state, error) {
      state.error = error.message[0]
      toast.error(error.message[0])
    },

    ADD_FILIERE(state, filiere) {
      state.listFilieres.unshift({ ...filiere, show: false })
    },
    REMOVE_FILIERE(state, code) {
      var index = state.listFilieres.findIndex((filiere) => filiere.code == code)
      state.listFilieres.splice(index, 1)
    },
    UPDATE_FILIERE(state, { newfil }) {
      var index = state.listFilieres.findIndex((filiere) => filiere.code == newfil.code)
      state.listFilieres[index] = newfil
    },

    //EMPLOYEES
    ADD_EMPLOYEE(state, employee) {
      state.listEmployees.unshift({ ...employee, show: false })
    },
    REMOVE_EMPLOYEE(state, idEmployee) {
      var index = state.listEmployees.findIndex((employee) => employee.id == idEmployee)
      state.listEmployees.splice(index, 1)
    },
    UPDATE_EMPLOYEE(state, { newemployee }) {
      var index = state.listEmployees.findIndex((employee) => employee.id == newemployee.id)
      state.listEmployees[index] = newemployee
    },
  },
  actions: {
    init({ dispatch }) {
      dispatch("setAxios")
      dispatch("getAllDocuments")

      dispatch("teachers/init", {}, { root: true })
      dispatch("courses/init", {}, { root: true })
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
    getAllDocuments({ commit }) {
      return mgntAPI
        .getDocuments()
        .then((response) => {
          if (response.status == 200) {
            commit("SET_LIST_DOCUMENTS", response.data)
            return true
          }
          console.log(response.data)
          return false
        })
        .catch(console.log)
    },
    getAllEmployees({ commit }) {
      return mgntAPI
        .getEmployees()
        .then((response) => {
          if (response.status == 200) {
            commit("SET_LIST_EMPLOYEES", response.data)
            console.log(response.data)
            return true
          }
          console.log(response.data)
          return false
        })
        .catch(console.log)
    },
     addEmployee({ commit }, data) {
      return mgntAPI
        .addEmployee(data)
        .then(({ status, data }) => {
          if (status < 300) {
            commit("ADD_EMPLOYEE", data)
            return true
          }
          console.log(data)
          return false
        })
        .catch((err) => console.log("EEEEEEEE/", err))
    },

    addDocument({ commit }, data) {
      return mgntAPI
        .addDocument(data)
        .then((response) => {
          if (response.status < 300) {
            commit("ADD_DOCUMENT", response.data)
            return true
          }
          console.log(response)
          return false
        })
        .catch((err) => console.log("EEEEEEEE/", err))
    },

    removeDocument({ commit }, idDocument) {
      return mgntAPI
        .removeDocument(idDocument)
        .then((response) => {
          if (response.status < 300) {
            commit("REMOVE_DOCUMENT", idDocument)
            console.log(response)
            return true
          }
          return false
        })
        .catch(console.log)
    },
    deleteDocument({ commit }, code) {
      return mgntAPI
        .softDeleteDocument(code)
        .then((response) => {
          if (response.status < 300) {
            commit("REMOVE_DOCUMENT", code)
            console.log(response)
            return true
          }
          return false
        })
        .catch(console.log)
    },
    updateDocument({ commit }, newValues) {
      return mgntAPI
        .updateDocument(newValues)
        .then((response) => {
          if (response.status < 300) {
            commit("UPDATE_DOCUMENT", { newDoc: response.data })
            console.log(response.data)
            return true
          }
          return false
        })
        .catch(console.log)
    },
    //FILIERE

    addFiliere({ commit }, data) {
      return mgntAPI
        .addFiliere(data)
        .then((response) => {
          if (response.status < 300) {
            commit("ADD_FILIERE", response.data)
            return true
          }
          console.log(response)
          return false
        })
        .catch((err) => console.log("EEEEEEEE/", err))
    },
    removeFiliere({ commit }, idFiliere) {
      return mgntAPI
        .removeFiliere(idFiliere)
        .then((response) => {
          if (response.status < 300) {
            commit("REMOVE_FILIERE", idFiliere)
            return true
          }
          return false
        })
        .catch(console.log)
    },
    updateFiliere({ commit }, newValues) {
      return mgntAPI
        .updateFiliere(newValues)
        .then((response) => {
          if (response.status < 300) {
            commit("UPDATE_FILIERE", { newFiliere: response.data })
            return true
          }
          return false
        })
        .catch(console.log)
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
}
