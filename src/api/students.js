import axios from "./config"

export default {
  getAll: async function () {
    return await axios.get("/students")
  },
  add: async function (payload) {
    return await axios.post("/students", payload)
  },
  addResponsable: async function (payload) {
    return await axios.post("/students/responsables", payload)
  },
  removeResponsable: async function (payload) {
    return await axios.delete("/students/responsables", { params: { idStudent, idResponsable } })
  },
  getById: async function (studentID) {
    return await axios.get(`/students/${studentID}`)
  },
  getResponsables: async function (studentID) {
    return await axios.get(`/students/orders/${studentID}`)
  },
  showByEmail: async function (studentEmail) {
    return await axios.get(`/students/${studentEmail}`)
  },
  updateById: async function (studentID, data) {
    return await axios.put(`/students/${studentID}`, data)
  },
  updateInfoConnexion: async function (studentID, data) {
    return await axios.put(`/students/infoconnexion/${studentID}`, data)
  },
  disableOrEnable: function (studentID, valueOfDisabled = false) {
    return axios.put(`/students/disableOrEnable/${studentID}`, {
      valueOfDisabled,
    })
  },
  deleteById: async function (studentID) {
    return await axios.delete(`/students/${studentID}`)
  },
  deleteByEmail: async function (studentEmail) {
    return await axios.delete(`/students/${studentEmail}`)
  },
}
