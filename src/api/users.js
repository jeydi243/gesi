import axios from "./config"

export default {
	login: async function (user) {
		return axios.post("/users/login", user)
	},
	logout: async function (userID, data) {
		return axios.put(`/users/logout`, data, { params: { userID } })
	},
}
