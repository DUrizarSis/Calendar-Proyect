const Event = require("../models/event")

module.exports = async (req, res) => {
    try {
      const userId = req.params.userId;
      const events = await Event.find({ user: userId });
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
