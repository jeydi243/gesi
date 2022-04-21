import axios from "./config"

export default {
  getAll: async function () {
    return await axios.get("/teachers")
  },
  add: async function (payload) {
    return await axios.post("/teachers", payload)
  },
  getById: async function (studentID) {
    return await axios.get(`/teachers/${studentID}`)
  },
  showByEmail: async function (studentEmail) {
    return await axios.get(`/teachers/${studentEmail}`)
  },
  updateById: async function (studentID, data) {
    return await axios.put(`/teachers/${studentID}`, data)
  },
  deleteById: async function (studentID) {
    return await axios.delete(`/teachers/${studentID}`)
  },
  deleteByEmail: async function (studentEmail) {
    return await axios.delete(`/teachers/${studentEmail}`)
  },
}
