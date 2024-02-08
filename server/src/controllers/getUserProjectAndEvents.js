const Project = require('../models/project');
const Event = require('../models/event');
const User = require('../models/user');

module.exports = async(req, res) => {

        try {
            const userId = req.params.userId;
    
            // Buscar proyectos en los que participa el usuario
            const userProjects = await Project.find({ team: userId });
    
            // Buscar eventos del usuario
            const userEvents = await Event.find({ user: userId });
    
            res.json({ userProjects, userEvents });

        } catch (error) {

            console.error('Error al obtener proyectos y eventos del usuario:', error);
            res.status(500).json({ message: 'Error al obtener proyectos y eventos del usuario' });
        
    }
};