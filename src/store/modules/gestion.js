import gestionAPI from "@/api/gestion"

export default {
  state: () => ({ courses: [], laptops: [], routeurs: [], cars: [] }),
  namespaced: true,
  mutations: {},
  actions: {},
  getters: {
    getCourses: (state) => state.courses,
    getLaptops: (state) => state.laptops,
    getRouteurs: (state) => state.routeurs,
    getCars: (state) => state.cars,
  },
}
