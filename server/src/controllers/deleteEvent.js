const Event = require("../models/event");

module.exports = async(req, res) => {

    try {
        const { id } = req.params;

        const event = await Event.deleteOne({_id: id})

        res.status(200).json(event)
    } catch (error) {
        res.status(500).json({message: error})
    }

}