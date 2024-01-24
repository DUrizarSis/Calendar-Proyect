const Event = require("../models/event")

module.exports = async(req, res) => {

    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json({ message: "Evento creado exitosamente", event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el evento" });
    }

};