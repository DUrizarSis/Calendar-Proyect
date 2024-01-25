const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    // Otros campos del usuario
    isSuperuser: {
        type: Boolean,
        default: false // Por defecto, un usuario no es un superusuario
    }
});

module.exports = mongoose.model('User', userSchema);