const Project = require("../models/project");

module.exports = async (req, res) => {
    try {
        const userId = req.params.userId; // Suponiendo que obtienes el ID del usuario de la solicitud
        const projects = await Project.find({ projectCreator: userId });

        if (!projects || projects.length === 0) {
            res.status(404).json({ message: "Projects not found for this user" });
            return;
        }

        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};