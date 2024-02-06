// getProjectById.js
const Project = require("../models/project");

module.exports = async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findById(projectId);
        if (!project) {
            res.status(404).json({ message: "Project not found" });
            return;
        }
        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};