import axios from "./config"

export default {
	routeDocuments: "/management/documents",
	routeFilieres: "/management/filieres",
	routeEmployees: "/employees",
	getDocuments: async function () {
		return axios.get(`${this.routeDocuments}`)
	},
	addDocument: async function (data) {
		return axios.post(`${this.routeDocuments}`, data)
	},
	updateDocument: async function (updatedDocument) {
		return axios.patch(`${this.routeDocuments}/update/${updatedDocument.code}`, updatedDocument)
	},
	removeDocument: async function (code) {
		return axios.delete(`${this.routeDocuments}/${code}`)
	},
	softDeleteDocument: async function (id, data) {
		return axios.patch(`${this.routeDocuments}/${code}`)
	},

	getFilieres: async function () {
		return axios.get(`${this.routeFilieres}`)
	},
	addFiliere: async function (data) {
		return axios.post(`${this.routeFilieres}`, data)
	},
	updateFiliere: async function (updatedFiliere) {
		return axios.patch(`${this.routeFilieres}/update/${updatedFiliere.code}`, updatedFiliere)
	},

	removeFiliere: async function (code) {
		return axios.delete(`${this.routeFilieres}/${code}`)
	},
	softDeleteFiliere: async function (id, data) {
		return axios.patch(`${this.routeFilieres}/${code}`)
	},

	// Employees routes
	addEmployee: async function (data) {
		return axios.post(`${this.routeEmployees}`, data)
	},
	getEmployees: async function () {
		return axios.get(`${this.routeEmployees}`)
	},
	employeeBy: async function (id) {
		return axios.get(`${this.routeEmployees}`, { params: { id } })
	},

	addEducation: async function (id, education) {
		return axios.post(`${this.routeEmployees}/${id}/add_education`, education)
	},
	addExperience: async function (id, experience) {
		return axios.post(`${this.routeEmployees}/${id}/add_experience`, experience)
	},
	deleteEducation: async function (id, educationID) {
		return axios.delete(`${this.routeEmployees}/${id}/delete_education`, { params: { educationID } })
	},
	deleteExperience: async function (id, experienceID) {
		return axios.delete(`${this.routeEmployees}/${id}/delete_experience`, { params: { experienceID } })
	},
	deleteEmployee: async function (employeeID) {
		return axios.delete(`${this.routeEmployees}/${employeeID}`)
	},
	updateExperience: async function (employeeID, experienceID, updatedExperience) {
		console.log("IN API: ",{ employeeID, experienceID, updatedExperience })
		return axios.patch(`${this.routeEmployees}/${employeeID}/update_experience?experienceID=${experienceID}`, { ...updatedExperience })
	},
	updateEducation: async function (employeeID, educationID, updateEducation) {
		return axios.patch(`${this.routeEmployees}/${employeeID}/update_education?educationID=${educationID}`, { ...updateEducation })
	},
}
const documents = {}
