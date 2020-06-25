import mongoose from 'mongoose';
let timestampPlugin = require('./plugins/timestamp')
const Etudiant = mongoose.Schema({
    emailEsis: String,
    emailPerso: String,
    codeAcces: String,
    passWord: String,
    pourcentageExetat: Number,
    sectionObtention: String,
    adresseEcole: String,
    adressePersonel: String,
    ecoleOrigine: String,
    genre: String,
    noteSante: String,
    telephone: String,
    dateDiplomeEsis: Date,
    responsables: Array, //must be id of responsables
    niveau: String,
    pourcentageObtenuTestAdmission: Number,
    statuts: String,
    date: Date,
    genres: String,
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
Etudiant.plugins(timestampPlugin);
export default mongoose.model('Etudiant', Etudiant);