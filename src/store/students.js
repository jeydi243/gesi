import studentsAPI from "@/api/students"
import { useConfig } from "@/store/config"
import { defineStore } from "pinia"

export const useStudents = defineStore("students", {
	state: () => ({ students: [] }),
	actions: {
		async init() {
			try {
				await this.getAllStudents()
			} catch (er) {
				console.log("Error on init students: ", er)
			}
		},
		async getAllStudents() {
			try {
				const { data, status } = await studentsAPI.getAll()
				if (status == 200 || status == 201) {
					this.students = data
					return true
				}
			} catch (er) {
				console.log(er)
			}
		},
	},
	getters: {
		getListDocuments: (state) => state.listDocuments,
		mystudents(state) {
			const config = useConfig()
			return state.students.filter((student) => student.level.toLowerCase() == config.currentLevelShort.toLowerCase())
		},
	},
})
