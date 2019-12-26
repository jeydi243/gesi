const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = {
    Etudiant: mongoose.model("Etudiant", Schema({
        matricule: {
            type: String,
            required: true
        },
        nom: {
            type: String,
            required: true
        },
        postnom: {
            type: String,
            required: true
        },
        prenom: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        dateNaissance: {
            type: Date,
            required: true
        },
        photoProfil: {
            type: String,
            required: true
        },
        telephone: {
            type: Number,
            required: true
        },
        adressePhysique: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        noteMedicale: {
            type: String,
            required: true
        },
        anneeInscription: {
            type: Number,
            required: true
        },
        responsable: {
            type: String,
            required: true
        },
        dateDiplomeEsis: {
            type: Date,
            required: true
        },
        statutEtudiant: {
            type: String,
            required: true
        },
        niveauEtudiant: {
            type: String,
            required: true
        },
        
    }, {
        timestamps: true
    })),
    Professeur: mongoose.model("Professeurs", Schema({
        matricule: {
            type: String,
            required: true
        },
        nom: {
            type: String,
            required: true
        },
        postnom: {
            type: String,
            required: true
        },
        prenom: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        dateNaissance: {
            type: String,
            required: true
        },
        photoProfil: {
            type: String,
            required: true
        },
        telephone: {
            type: String,
            required: true
        },
        adressePhysique: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        noteMedicale: {
            type: String,
            required: true
        },
        anneeInscription: {
            type: String,
            required: true
        },
        responsable: {
            type: String,
            required: true
        },
        anneeInscription: {
            type: String,
            required: true
        },
        anneeInscription: {
            type: String,
            required: true
        },
        anneeInscription: {
            type: String,
            required: true
        },
        
    }, {
        timestamps: true
    })),

}