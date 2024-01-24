const Event = require("../models/event");

module.exports = async(req, res) => {

    try {
        const { id } = req.params;
        const { title, start, end } = req.body;

        const event = await Event.updateOne({ _id: id}, {$set: {title, start, end}})
        
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({message: error})
    }

}