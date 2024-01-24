const express = require("express");
const postEvent = require("../controllers/postEvent");
const getEvents = require("../controllers/getEvents");
const getEvent = require("../controllers/getEvent");
const putEvent = require("../controllers/putEvent");
const deleteEvent = require("../controllers/deleteEvent");

const router = express.Router();

//?Routes
//Post event route
router.post("/create-event", postEvent )

//Get events route
router.get("/get-events", getEvents )

//Get One event
router.get("/get-events/:id", getEvent);

//Update event
router.put("/put-events/:id", putEvent);

//Delete event
router.delete("/delete-events/:id", deleteEvent);


module.exports = router;