import mgntAPI from "@/api/management"
import teachersAPI from "@/api/teachers"
import coursesAPI from "@/api/courses"
import axios from "@/api/config"
import { toast } from "@/utils/utils"
import { defineStore } from "pinia"
import { useTeachers } from "./teachers"
// import { useCourses } from "./courses"
export const useManagement = defineStore("management", {
	state: () => ({
		courses: [],
		laptops: [],
		routeurs: [],
		listDocuments: [],
		employees: [],
		token: null,
		error: null,
	}),

	actions: {
		async init() {
			try {
				const t = useTeachers()
				this.setAxios()
				t.init()
				await this.getAllDocuments()
				await this.getAllEmployees()
			} catch (error) {}

			//   c.init()
		},
		setAxios() {
			axios.interceptors.request.use(
				function (config) {
					if (state.token) {
						config.headers.Authorization = `Bearer ${state.token}`
					}
					return config
				},
				function onRejected(error) {
					// Do something with request error
					return Promise.reject(error)
				},
				{ synchronous: true }
			)
			axios.interceptors.response.use(
				function (response) {
					//   console.info(`[AXIOS] Response status ${response.status}`)
					return response
				},
				function (error) {
					//   console.error(`[AXIOS] Error ${JSON.stringify(error.response)}`)
					//   if (error.code == "ECONNABORTED") {
					//     toast.error("La requete a pris trop de temps. Verifier votre connexion et retenter dans quelques temps", {
					//       type: "error",
					//       duration: 50000,
					//       singleton: true,
					//       action: {
					//         text: "Relancer la page",
					//         onClick: (e, toastObject) => {
					//           console.log("Relaod after error")
					//           router.go()
					//         },
					//       },
					//     })
					//     console.log({ error })
					//   } else if (error.code === "ERR_CONNECTION_REFUSED") {
					//     console.log("[ECONNABORTED] Impossible de contacter le serveur :", {
					//       error,
					//     })
					//     router.push({ name: "error" })
					//   } else if (error.code === "ERR_FAILED") {
					//     console.log("[ERR_FAILED] Impossible de contacter le serveur :", {
					//       error,
					//     })
					//     router.push({ name: "error" })
					//   } else {
					console.log("Error code:", JSON.stringify(error))
					this.errorCall = error.response.data
					//   }
					return Promise.reject(error)
				}
			)
		},
		async getAllDocuments() {
			try {
				const { data, status } = await mgntAPI.getDocuments()
				if (status == 200 || status == 201) {
					data
						.map((doc) => {
							doc["show"] = false
							return doc
						})
						.forEach((doc) => this.listDocuments.unshift(doc))
					return true
				}

				return false
			} catch (er) {
				console.log(err)
			}
		},
		async getAllEmployees() {
			this.employees = []
			try {
				const { data, status } = await mgntAPI.getEmployees()
				if (status == 200 || status == 201) {
					console.log({ employees: data })
					if (data.length > 0) {
						data.forEach((employee) => {
							this.employees.unshift(employee)
							setTimeout(() => {}, 1000)
						})
					} else {
						this.employees = data
					}
					return true
				}
				return false
			} catch (er) {
				console.log(er)
			}
		},
		async deleteEmployee(employeeID) {
			try {
				const { status } = await mgntAPI.deleteEmployee(employeeID)
				if (status == 200 || status == 201) {
					const index = this.employees.findIndex((emp) => emp._id == employeeID)
					this.employees.splice(index, 1)
					return true
				}
				return false
			} catch (er) {
				console.log(er)
				return false
			}
		},

		async employeeBy(employeeID) {
			try {
				const { data, status } = await mgntAPI.employeeBy(employeeID)
				if (status == 200 || status == 201) {
					const index = this.employees.findIndex((emp) => emp._id == employeeID)
					this.employees[index] = data[0]
					return true
				}
				return false
			} catch (er) {
				console.log(er)
			}
		},
		async addExperience(id, experience) {
			try {
				const { data, status } = await mgntAPI.addExperience(id, experience)
				if (status == 200 || status == 201) {
					const index = this.employees.findIndex((emp) => emp._id == data.id)
					this.employees[index].experiences.unshift(data)
					return true
				}
				return false
			} catch (er) {
				console.log(er)
				return false
			}
		},
		async addEmployee(newEmployee) {
			try {
				const { data, status, headers } = await mgntAPI.addEmployee(newEmployee)
				if (status == 200 || status == 201) {
					this.employees.unshift({ ...data, show: false })
					return true
				} else if (status == 304) {
					console.log("Employee already exists. HEARDS=>", headers)
				}
				console.log(data)
				return false
			} catch (er) {
				console.log(er)
			}
		},
		async addEducation(employeeID, education) {
			try {
				const { data, status } = await mgntAPI.addEducation(employeeID, education)
				if (status == 201 || status === 200) {
					let index = this.employees.findIndex((em) => em._id == employeeID)
					this.employees[index].educations.push(data)
					return true
				}
				return false
			} catch (err) {
				console.log(err)
				return false
			}
		},
		async deleteEducation(employeeID, educationID) {
			try {
				const { data, status, headers } = await mgntAPI.deleteEducation(employeeID, educationID)
				if (status == 200 || status == 201) {
					const indexEmp = this.employees.findIndex((emp) => emp._id == employeeID)
					const indexEduc = this.employees[indexEmp].educations.findIndex((educ) => (educ.id = educationID))
					if (indexEduc != -1) {
						this.employees[indexEmp].educations.splice(indexEduc, 1)
						return true
					} else {
						return false
					}
				} else if (status == 304) {
					console.log({ headers })
				}
				return false
			} catch (er) {
				console.log(er)
				return false
			}
		},
		async deleteExperience(employeeID, experienceID) {
			try {
				const { status, headers } = await mgntAPI.deleteExperience(employeeID, experienceID)
				if (status == 200 || status == 201) {
					const index = this.employees.findIndex((emp) => emp._id == employeeID)
					console.log({ index })
					const indexExp = this.employees[index].educations.findIndex((educ) => (educ.id = experienceID))
					if (indexExp != -1) {
						this.employees[index].educations.splice(indexExp, 1)
						return true
					} else {
						return false
					}
				} else if (status == 304) {
					console.log({ headers })
					return false
				}
				return false
			} catch (er) {
				console.log(er)
				return false
			}
		},
		async updateExperience(employeeID, experienceID, experience) {
			try {
				const { data, status, headers } = await mgntAPI.updateExperience(employeeID, { id: experienceID, ...experience })
				console.log({ data, status, headers })
				if ((status == 200 || status == 201) && data != "") {
					const index = this.employees.findIndex((emp) => emp._id == employeeID)
					const indexExp = this.employees[index].experiences.findIndex((exp) => (exp.id = experienceID))
					if (indexExp != -1) {
						this.employees[index].experiences[indexExp] = data
					} else {
						return false
					}
					return true
				} else if (status == 304) {
					console.log("Experience already exists ", headers)
					return false
				}
			} catch (er) {
				console.log(er)
				return false
			}
		},
		async updateEducation(employeeID, educationID, education) {
			try {
				console.log({ employeeID, educationID, education })
				const { data, status, headers } = await mgntAPI.updateEducation(employeeID, { id: educationID, ...education })
				if ((status == 200 || status == 201) && data != "") {
					const index = this.employees.findIndex((emp) => emp._id == employeeID)
					const indexExp = this.employees[index].educations.findIndex((educ) => (educ.id = educationID))
					if (indexExp != -1) {
						this.employees[index].educations[indexExp] = data
					} else {
						return false
					}
					return true
				} else if (status == 304) {
					console.log("Education can't be updated ", headers)
					return false
				}
			} catch (er) {
				console.log(er)
				return false
			}
		},

		async addDocument(newDocument) {
			try {
				const { data, status } = await mgntAPI.addDocument(newDocument)
				if (status == 200 || status == 201) {
					this.listDocuments.unshift({ ...data, show: false })
					return true
				}
				console.log(data)
				return false
			} catch (er) {
				console.log(er)
			}
		},
		async removeDocument(idDocument) {
			try {
				const { data, status } = await mgntAPI.removeDocument(idDocument)
				if (status == 200 || status == 201) {
					var index = this.listDocuments.findIndex((doc) => doc.idDocument == idDocument)
					this.listDocuments.splice(index, 1)
					console.log(data)
					return true
				}
				return false
			} catch (er) {
				console.log(er)
			}
		},
		async deleteDocument(code) {
			try {
				const { data, status } = await mgntAPI.softDeleteDocument(code)
				if (status == 200 || status == 201) {
					var index = this.listDocuments.findIndex((doc) => doc.code == code)
					this.listDocuments.splice(index, 1)
					console.log(data)
					return true
				}
				return false
			} catch (er) {
				console.log(er)
			}
		},
		async updateDocument(newValues) {
			try {
				const { data, status } = await mgntAPI.updateDocument(newValues)
				if (status < 300) {
					var index = this.listDocuments.findIndex((doc) => doc.code == data.code)
					this.listDocuments[index] = newDoc
					console.log(data)
					return true
				}
				return false
			} catch (er) {
				console.log(er)
			}
		},
		async addFiliere(newFiliere) {
			try {
				const { data, status } = await mgntAPI.addFiliere(newFiliere)
				if (status < 300) {
					this.listFilieres.unshift({ ...data, show: false })
					return true
				}
				console.log(data)
			} catch (er) {
				console.log(er)
			}
		},
		async removeFiliere(idFiliere) {
			try {
				const { data, status } = await mgntAPI.removeFiliere(idFiliere)
				if (status == 200 || status == 201) {
					var index = this.listFilieres.findIndex((filiere) => filiere.id == data.id)
					this.listFilieres.splice(index, 1)
					console.log(data)
					return true
				}
				return false
			} catch (er) {
				console.log(err)
			}
		},
		async updateFiliere(newValues) {
			try {
				const { data, status } = await mgntAPI.updateFiliere(newValues)
				if (status == 200 || status == 201) {
					const index = this.listFilieres.findIndex((filiere) => filiere.id == data.id)
					this.listFilieres[index] = data
					return true
				}
				return false
			} catch (er) {
				console.log(err)
			}
		},
	},
	getters: {
		getCars: (state) => state.cars,
		getCourses: (state) => state.courses,
		getEmployees: (state) => state.employees,
		getLaptops: (state) => state.laptops,
		getRouteurs: (state) => state.routeurs,
		getListDocuments: (state) => state.listDocuments,
		errorCall: (state) => state.error,
	},
})
