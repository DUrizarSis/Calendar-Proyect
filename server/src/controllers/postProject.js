const Project = require("../models/project");

module.exports = async (req, res) => {
    try {
        const project = new Project(req.body);

        await project.save();

        res.status(201).json({ message: "Project created", project });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error with the creation of the Project" });
    }
};