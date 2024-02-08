const mongoose = require("mongoose");


const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    start: {
        type: Date,
        require: true
    },
    end: {
        type: Date,
        require: true
    },
    color: {
        type: String,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    superuser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project' // Referencia al modelo de proyecto
    },
});

module.exports = mongoose.model('Event', eventSchema);