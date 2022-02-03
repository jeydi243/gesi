import axios from "./config"

export default {
  login: async function (user) {
    return axios.post("/users/login", user)
  },
  logout: async function (studentID, data) {
    return axios.get(`/users/logout`)
  },
}
