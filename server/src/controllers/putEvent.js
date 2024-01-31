const Event = require("../models/event");

 module.exports = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, start, end, color } = req.body;
  
      const event = await Event.updateOne({ _id: id }, { $set: { title, start, end, description, color } });
  
      // Recupera el evento actualizado después de la actualización
      const updatedEvent = await Event.findById(id);

      res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server Error" });
    }
};