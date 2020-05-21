import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
var state= {
	ficheEtudiant: {
		pourcentageExetat: 0,
		sectionObtention: "",
		adresseEcole: "",
		ecoleOrigine: "",
		genre: "F",
		noteSante: "",
		telephone: "",
		emailPerso: "",
		dateDiplomeEsis: Date,
		responsables: [{}],
		responsableNom: "",
		responsableNumero: "",
		responsableEmail: "",
		niveau: ["PREPA", "G1", "G2", "G3"],
		again1: false,
		again2: false,
		pourcentageObtenuTest: 0,
		statuts: ["Candidat", "Etudiant", "Diplomé", "Abandon", "Renvoi"],
		date: null,
		valid: false,
		menu: false,
		genres: ["M", "F"],
		adresse: "",
		anneeInscription: new Date().getFullYear().toString(),
		tel: "",
		firstname: "",
		nickname: "",
		lastname: "",
		telRules: [v => !!v || "Ce champ est obligatoire"],
		email: "",
	}
};
var mutations= {};
var actions= {};
var modules= {};
export default new Vuex.Store({
	state,
	actions,
	mutations,
	modules
})