import usersAPI from "@/api/user"
import axios from "@/api/config"

export default {
  state: () => ({ user: null, token: null, authResponse: null }),
  namespaced: true,
  mutations: {
    SET_JWT_TOKEN(state, token) {
      state.token = token
    },
    SET_USER(state, user) {
      state.user = user
    },
    SET_AUTH_RESPONSE(state, authResponse) {
      if (authResponse == "Unauthorized") {
        state.authResponse = "Vous n'avez l'autorisation pour acceder à cette page"
      } else {
        state.authResponse = authResponse
      }
      setTimeout(() => {
        state.authResponse = null
      }, 10000)
    },
  },
  actions: {
    init({ dispatch }) {
      dispatch("getStudents")
    },
    logout({ commit }) {
      return usersAPI.logout()
    },
    async login({ commit, dispatch }, payload) {
      console.log(payload)
      return usersAPI
        .login(payload)
        .then(({ data, status }) => {
          commit("SET_AUTH_RESPONSE", data.message)
          if (data.token) {
            commit("SET_JWT_TOKEN", data.token)
            commit("SET_USER", data.user)
            return dispatch("setAxiosInterceptor")
          } else console.log("No token")
        })
        .catch((err) => {
          console.log(err)
          commit("SET_AUTH_RESPONSE", err.response.data)
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
        //   console.info(`%c[Axios ${response.status}] `, "color: #0080ff; font-weight: bold;")
          return response
        },
        function (error) {
          console.log(`%c[Axios] Error ${JSON.stringify(error)}`, "color: #ff0000; font-weight: bold;")
          return Promise.reject(error)
        }
      )
    },
  },
  getters: {
    getCurrentUser: (state) => state.user,
    getToken: (state) => state.token,
    getAuthResponse: (state) => state.authResponse,
  },
}
