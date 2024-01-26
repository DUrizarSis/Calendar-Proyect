const Event = require("../models/event")

//Get event by id
module.exports = async(req, res) => {

    try {
        const { id }= req.params;

        const event = await Event.findById(id);
        if(!event){
            res.status(404).json({ message: "Event not found"})
            return;
        }

        res.status(200).json(event)

    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }

};