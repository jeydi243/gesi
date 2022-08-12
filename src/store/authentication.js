import usersAPI from "@/api/user"
import axios from "@/api/config"
import { defineStore } from "pinia"

export const useAuthentication = defineStore("authentication", {
  state: () => ({ user: null, token: null, authResponse: null }),

  actions: {
    async init() {
      await this.getAllStudents()
    },
    async logout() {
      return await usersAPI.logout()
    },
    async login({ commit, dispatch }, payload) {
      console.log(payload)
      try {
        const { data, status } = await usersAPI.login(payload)
        if (data.token && (status == 200 || status == 201)) {
          this.token = data.token
          this.user = data.user
          return await this.setAxiosInterceptor()
        } else console.log("No token for this user")
      } catch (error) {
        this.authResponse = error.response
      }
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
})