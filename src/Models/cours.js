import mongoose from 'mongoose';
let timestampPlugin = require('./plugins/timestamp')

var Cours = mongoose.Schema({
    nom: String,
    plan: String,
    description: String,
    volumeHoaire:Number,
    typeCours: String,
    filiere: String,
    option: String,
    nomProfesseur: String,
    tags: String, // ex: cours de maths
    ressources:Array
});
Cours.plugins(timestampPlugin);

export default mongoose.model('Cours', Cours);