import mongoose from 'mongoose';
let timestampPlugin = require('./plugins/timestamp')

var Cours = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    plan: String,
    description: String,
    volumeHoaire: {
        type: Number,
        required: true
    },
    typeCours: String,
    filiere: {
        type: String,
        required: false
    },
    option: String,
    nomProfesseur: {
        type: String,
        required:true
    },
    tags: String, // ex: cours de maths
    ressources: Array
});
Cours.plugins(timestampPlugin);

export default mongoose.model('Cours', Cours);