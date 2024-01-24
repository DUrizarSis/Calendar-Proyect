const mongoose = require("mongoose");


const eventSchema = mongoose.Schema({
    title: {
        type: String
    },
    start: {
        type: String
    },
    end: {
        type: String
    }
});

module.exports = mongoose.model('Event', eventSchema);