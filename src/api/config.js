import axios from "axios"

axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.validateStatus = (status) => {
  return status < 500
}
// axios.defaults.timeout = 10000;
// axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
export default axios
