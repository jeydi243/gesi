import axios from "./config"

export default {
  routeDocuments: "/management/documents",
  routeFilieres: "/management/filieres",
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
}
const documents = {}
