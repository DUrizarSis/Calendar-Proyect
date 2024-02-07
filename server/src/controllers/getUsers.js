const User = require('../models/user')

module.exports = async(req, res) => {
    try {
        const users = await User.find()

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "Users not founds" })
        }

        // Filtrar los usuarios normales
        const normalUsers = users.filter(user => !user.isSuperuser)

        // Filtrar los superusuarios
        const superUsers = users.filter(user => user.isSuperuser)

        res.status(200).json({ normalUsers, superUsers })
    } catch (error) {
        console.log("Error getting users", error)
        res.status(500).json({ message: "Error from server" })
    }
}