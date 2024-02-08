const Event = require('../models/event');

module.exports = async (req, res) => {
    const idUser = req.query.idUser;
    const idProject = req.query.idProject;

    try {
        const events = await Event.find({ user: idUser });

        if (events.length > 0) {

            const eventsProjectUser = events.filter(event => event.project.equals(idProject));

            res.status(200).json(eventsProjectUser);
        } else {
            res.status(404).json("No events found for the user");
        }
    } catch (error) {
        res.status(500).json("Internal Server Error", error);
    }
};