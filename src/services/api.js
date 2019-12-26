import axios from 'axios';
const BASE_URL = 'http://localhost:5000';

export function getEtudiants() {
	return axios.get(`${BASE_URL}/etudiant/list`)
		.then(response => response.data);
}

export function addEtudiant(data) {
	return axios.post(`${BASE_URL}/etudiant/add`, {
			title: data.title,
			body: data.body
		}).then(response => {
			return response.data
		})
		.catch(err => Promise.reject(err.message));
}

export function deleteNote(id) {
	return axios.post(`${BASE_URL}/api/note/delete/${id}`)
		.then(response => response.data)
		.catch(err => Promise.reject(err.message));
}

export function updateNote(data, id) {
	return axios.post(`${BASE_URL}/api/note/update/${id}`, {
			data
		})
		.then(response => {
			return response.data
		})
		.catch(err => Promise.reject(err.message));
}