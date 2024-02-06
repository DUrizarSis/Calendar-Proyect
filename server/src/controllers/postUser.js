const User = require('../models/user');

module.exports = async (req, res) => {
    try {
        // Validación de email y contraseña
        const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailValidation.test(req.body.email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (req.body.password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        // Verificar si ya existe un usuario con el mismo username o email
        const existingUser = await User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.email }
            ]
        });

        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        }

        // Si no existe, crear el nuevo usuario
        const newUser = new User(req.body);

        await newUser.save();

        res.status(201).json({ message: "New user created successfully", user: newUser, access: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error with the creation of the User" });
    }
};