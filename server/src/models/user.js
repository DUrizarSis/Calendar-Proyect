const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Garantiza que cada correo electrónico sea único
    },
    password: {
        type: String,
        required: true
    },

    image: {
        type: String // para almacenar la imagen del usuario
    },
    
    isSuperuser: {
        type: Boolean,
        default: false // Por defecto, un usuario no es un superusuario
    }
});

module.exports = mongoose.model('User', userSchema);