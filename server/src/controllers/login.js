const User = require('../models/user')

module.exports = async (req, res) => {
    try {
        const { username, password } = req.query;

        if (!username || !password) {
            return res.status(400).json({ error: 'Incomplete data' });
        }

        const logUser = await User.findOne({ username: username });

        // User Validation
        if (!logUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Password Validation
        if (logUser.password !== password) {
            return res.status(403).json({ message: 'Incorrect password' });
        }

        // Success Validation
        // Excluir campos sensibles (password y email) :)
        const responseData = {
            access: true,
            user: {
                _id: logUser._id,
                username: logUser.username,
                image: logUser.image,
                isSuperuser: logUser.isSuperuser
            },
        };

        return res.status(200).json(responseData);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};