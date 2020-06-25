import mongoose from 'mongoose';

const Etudiant = mongoose.Schema({
    emailEsis: String,
    emailPerso: String,
    codeAcces: String,
    passWord: String,
    pourcentageExetat: Number,
    sectionObtention: String,
    adresseEcole: String,
    ecoleOrigine: String,
    genre: String,
    noteSante: String,
    telephone: String,
    dateDiplomeEsis: Date,
    responsables: Array, //must be id of responsables
    niveau: String,
    pourcentageObtenuTest: Number,
    statuts: String,
    date: Date,
    genres: String,
    adresse: String,
    anneeInscription: {
        type: Date,
        default: new Date()
    },
    name: {
        first: String,
        last: String,
        nick: String,
    },
})

export default mongoose.model('Etudiant', Etudiant);