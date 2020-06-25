import mongoose from 'mongoose';

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

export default mongoose.model('User', User);