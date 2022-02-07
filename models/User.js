const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true, // No puede guardarse en db si se manda un dato con espacios
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Por favor utiliza un email válido."]
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true // se guarda la fecha y hora en la que se creo un documento
});

const User = mongoose.model('User', userSchema);

module.exports = User;