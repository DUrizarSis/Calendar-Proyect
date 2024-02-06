const Project = require("../models/project");

module.exports = async (req, res) => {
    try {
        const projectId = req.params.id;
        const updatedProject = await Project.findByIdAndUpdate(projectId, req.body, { new: true });
        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ message: "Project updated", project: updatedProject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};