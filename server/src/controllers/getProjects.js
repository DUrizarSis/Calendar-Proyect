const Project = require("../models/project");

module.exports = async (req, res) => {
    try {
        const projects = await Project.find();
        
        console.log("projects > ", projects)

        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};