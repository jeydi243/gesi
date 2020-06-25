import mongoose from 'mongoose';

const Etudiant = mongoose.Schema({
    emailEsis: String,
    codeAcces: String,
    der: Boolean,
    passWord: String,
    pourcentageExetat: Number,
    sectionObtention: String,
    adresseEcole: String,
    ecoleOrigine: String,
    genre: String,
    noteSante: String,
    telephone: String,
    emailPerso: String,
    dateDiplomeEsis: Date,
    responsables: [String], //must be id of responsables
    niveau: String,
    pourcentageObtenuTest: Number,
    statuts: String,
    date: Date,
    genres: String,
    adresse: String,
    anneeInscription: {
        type: Date,
        default: new Date().getFullYear().toString()
    },
    tel: String,
    name: {
        firstname: String,
        nickname: String,
        lastname: String,
    },
    email: String,
})

export default mongoose.model('Etudiant', Etudiant);