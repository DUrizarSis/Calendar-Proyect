const Project = require("../models/project");

module.exports = async (req, res) => {
    try {
        const projectId = req.params.id;
        const deletedProject = await Project.findByIdAndDelete(projectId);
        if (!deletedProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ message: "Project deleted", project: deletedProject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};