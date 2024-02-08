const express = require("express");

const postEvent = require("../controllers/postEvent");
const getEvents = require("../controllers/getEvents");
const getEvent = require("../controllers/getEvent");
const putEvent = require("../controllers/putEvent");
const deleteEvent = require("../controllers/deleteEvent");

const getUsers = require("../controllers/getUsers");
const postUser = require("../controllers/postUser");
const login = require("../controllers/login");

const postProject = require('../controllers/postProject')
const getProjects = require("../controllers/getProjects");
const getProjectById = require("../controllers/getProjectById");
const updateProject = require("../controllers/updateProject");
const deleteProject= require("../controllers/deleteProject");
const getUserProjectAndEvents = require("../controllers/getUserProjectAndEvents");
const getUserProjEvents = require("../controllers/getUserProjEvents");




const router = express.Router();

//?Routes
//Post event route
router.post("/create-event", postEvent )

//Get events route
router.get("/get-events/:userId", getEvents);

//Get One event
router.get("/get-events/:id", getEvent);

//Update event
router.put("/put-events/:id", putEvent);

//Delete event
router.delete("/delete-events/:id", deleteEvent);

//get users
router.get('/users', getUsers)

//Post user
router.post('/new-user', postUser);

//Login users
router.get('/user', login);



router.post("/projects", postProject); // Crear un nuevo proyecto

router.get("/projects/all", getProjects); // Obtener todos los proyectos

router.get("/projects/:id", getProjectById); // Obtener un proyecto por su ID

router.put("/projects/:id", updateProject); // Actualizar un proyecto 

router.delete("/projects/:id", deleteProject); // Eliminar un proyecto

router.get("/:id/projects-events", getUserProjectAndEvents)

router.get("/projects-events", getUserProjEvents); //Traer events de un user en cierto project

module.exports = router;