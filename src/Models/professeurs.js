import mongoose from 'mongoose';
let timestampPlugin = require('./plugins/timestamp')

var Professeur = mongoose.Schema({
    matricule: {
        type: String,
        required: true
    },
    nom: {
        first: {
            type: String,
            required: true
        },
        last: String,
        nickname: String
    },
    titre: String,
    dateNaissance: String,
    photo: String,
    adressePersonnel: String,
    emailPerso: String,
    diplome: Array,
    nomEntreprise: String,
    adresseEntreprise: String,
    telephone: {
        type: String,
        required: true
    },
    presentation: String,
    tauxHoraire: Number
});
Professeur.plugins(timestampPlugin);

export default mongoose.model('Professeur', Professeur);