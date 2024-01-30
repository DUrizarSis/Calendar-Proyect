const Event = require("../models/event");

module.exports = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, start, end } = req.body;
  
      const event = await Event.updateOne({ _id: id }, { $set: { title, start, end } });
  
      res.status(200).json({ message: "Event updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server Error" });
    }
  };