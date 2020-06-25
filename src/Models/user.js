import mongoose from 'mongoose';
let timestampPlugin = require('./plugins/timestamp')

var User = mongoose.Schema({
    profil: {
        type: String,
        required: true,
        lowercase: true,
    },
    email: {
        type:String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    }
});
User.plugins(timestampPlugin);
export default mongoose.model('User', User);