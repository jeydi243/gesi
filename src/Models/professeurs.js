import mongoose from 'mongoose';

var Professeur = mongoose.Schema({
    matricule: String,
    nom: {
        post: String,
        prenom: String
    },
    titre: String,
    dateNaissance: String,
    photo: String,
    adressePersonnel: String,
    emailPerso: String,
    diplome: Array,
    nomEntreprise: String,
    adresseEntreprise: String,
    telephone: String,
    presentation: String,
    tauxHoraire: Number
});

export default mongoose.model('Professeur', Professeur);