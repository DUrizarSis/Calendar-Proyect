const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    color: {
        type: String,
    },
    projectCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    
    },
    team: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Project', projectSchema);