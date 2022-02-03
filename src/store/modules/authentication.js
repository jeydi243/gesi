import usersAPI from "@/api/user"
import axios from "@/api/config"

export default {
  state: () => ({ user: null, token: null }),
  namespaced: true,
  mutations: {
    SET_JWT_TOKEN(state, token) {
      state.token = token
    },
  },
  actions: {
    init({ dispatch }) {
      dispatch("getStudents")
    },
    logout({ commit }) {
      return usersAPI.logout()
    },
    async login({ commit, dispatch }, data) {
      console.log(data)
      return usersAPI
        .login(data)
        .then(({ data }) => {
          console.log(data)
          if (data.token) commit("SET_JWT_TOKEN", data.token)
          return dispatch("setAxiosInterceptor")
        })
        .catch((err) => {
          console.log(err)
          return err
        })
    },
    setAxiosInterceptor({ state, commit }) {
      axios.interceptors.request.use(
        function (config) {
          config.headers.Authorization = `Bearer ${state.token}`
          return config
        },
        null,
        { synchronous: true }
      )
      axios.interceptors.response.use(
        function (response) {
          console.info(`[Axios] Response status ${response.status}`)
          return response
        },
        function (error) {
          console.error(`[Axios] Error ${JSON.stringify(error)}`)
          if (error.code == "ECONNABORTED") {
            Vue.toasted.show(
              "La requete a pris trop de temps. Verifier votre connexion et retenter dans quelques temps",
              {
                type: "error",
                duration: 50000,
                singleton: true,
                action: {
                  text: "Relancer la page",
                  onClick: (e, toastObject) => {
                    console.log("Relaod after error")
                    router.go()
                  },
                },
              }
            )
            console.log({ error })
          } else if (error.code === "ERR_CONNECTION_REFUSED") {
            console.log("[ECONNABORTED] Impossible de contacter le serveur :", {
              error,
            })
            router.push({ name: "error" })
          } else if (error.code === "ERR_FAILED") {
            console.log("[ERR_FAILED] Impossible de contacter le serveur :", {
              error,
            })
            router.push({ name: "error" })
          } else {
            // Vue.toasted.show("Nous éprouvons quelques difficultés à contacter le serveur.\nVérifier votre connexion et tenter à nouveau dans quelques temps."
            // , {
            //   type: "error",
            //   singleton: true,
            //   duration: 5000
            // });
            commit("SET_ERROR", error)
          }
          return Promise.reject(error)
        }
      )
    },
  },
  getters: { getCurrentUser: (state) => state.user, getToken: (state) => state.token },
}
