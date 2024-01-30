const Event = require("../models/event");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    const deletedEvent = await Event.findByIdAndDelete(id);

    if (deletedEvent) {
      res.status(200).json({ message: "Event deleted successfully" });
    } else {
      res.status(500).json({ message: "Error deleting event" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};