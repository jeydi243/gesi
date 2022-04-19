import mgntAPI from "@/api/management"
import axios from "@/api/config"
import { toast } from "@/utils/utils"

export default {
  state: () => ({ courses: [], laptops: [], routeurs: [], listDocuments: [], token: null, error: null }),
  namespaced: true,
  mutations: {
    SET_LIST_DOCUMENTS(state, documents) {
      state.listDocuments = documents
    },
    ADD_DOCUMENT(state, document) {
      state.listDocuments.unshift(document)
    },
    REMOVE_DOCUMENT(state, code) {
      var index = state.listDocuments.findIndex((doc) => doc.code == code)
      state.listDocuments.splice(index, 1)
    },
    SET_ERROR(state, error) {
      state.error = error.message[0]
      toast.error(error.message[0])
    },
  },
  actions: {
    init({ dispatch }) {
      dispatch("setAxios")
      dispatch("getAllDocuments")
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
    updateDocument({ commit }, code) {
      return mgntAPI
        .updateDocument(code)
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
  },
  getters: {
    getCars: (state) => state.cars,
    getCourses: (state) => state.courses,
    getLaptops: (state) => state.laptops,
    getRouteurs: (state) => state.routeurs,
    getListDocuments: (state) => state.listDocuments,
    errorCall: (state) => state.error,
  },
}
