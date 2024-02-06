const Project = require("../models/project");


const postProject = async (req, res) => {
    console.log("posting project!")
    try {
        const project = new Project(req.body);
        console.log("response from db is ", project);
        await project.save();

        res.status(201).json({ message: "Project created", project });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error with the creation of the project" });
    }
};

module.exports = postProject;