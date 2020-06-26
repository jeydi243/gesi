import mongoose from 'mongoose';
let timestampPlugin = require('./plugins/timestamp')

const Candidats = mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    postnom: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    dateNaissance: {
        type: Date,
        default:Date()
    },
    situationFamiliale: {
        type:String
    },
    telephone: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: false,
    },
    sectionObtention: {
        type:String
    },
    pourcentageObtenuExetat: {
        type: String,
        required:true
    },
    numeroDiplome: {
        type:String
    },
    ecoleOrigine: {
        type:String
    },
    adresseEcoleOrigine: {
        type:String
    },
    photoCandidat: {
        type:String //Path to Image
    },
    motivation: {
        type:String
    },
    remarques: {
        type:String
    }

})
Candidats.plugins(timestampPlugin);
export default mongoose.model('Candidats', Candidats);