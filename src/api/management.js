import axios from "./config"

export default {
  routeDocuments: "/management/documents",
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
}
const documents = {}
