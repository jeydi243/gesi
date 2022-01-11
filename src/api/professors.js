import axios from "./config"

export default {
  getAll: async function () {
    return await axios.get("/professors")
  },
  add: async function (payload) {
    return await axios.post("/professors", payload)
  },
  getById: async function (studentID) {
    return await axios.get(`/professors/${studentID}`)
  },
  getResponsables: async function (studentID) {
    return await axios.get(`/professors/orders/${studentID}`)
  },
  showByEmail: async function (studentEmail) {
    return await axios.get(`/professors/${studentEmail}`)
  },
  updateById: async function (studentID, data) {
    return await axios.put(`/professors/${studentID}`, data)
  },
  updateInfoConnexion: async function (studentID, data) {
    return await axios.put(`/professors/infoconnexion/${studentID}`, data)
  },
  disableOrEnable: function (studentID, valueOfDisabled = false) {
    return axios.put(`/professors/disableOrEnable/${studentID}`, {
      valueOfDisabled,
    })
  },
  deleteById: async function (studentID) {
    return await axios.delete(`/professors/${studentID}`)
  },
  deleteByEmail: async function (studentEmail) {
    return await axios.delete(`/professors/${studentEmail}`)
  },
}
