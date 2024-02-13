const Event = require('../models/event');

module.exports = async (req, res) => {
    const idUser = req.query.idUser;
    const idProject = req.query.idProject;

    try {
        const events = await Event.find({ user: idUser });

        console.log(events.length)

        if (events.length > 0) {

            const eventsProjectUser = events.filter(event => event.project.equals(idProject));
                console.log(eventsProjectUser)

            if(eventsProjectUser.length > 0) res.status(200).json(eventsProjectUser)
            else res.json({message: "No events have been found for the user within this project."});
            
        } else {
            res.json({message: "No events have been found for the user within this project."});
        }
    } catch (error) {
        res.status(500).json("Internal Server Error", error);
    }
};