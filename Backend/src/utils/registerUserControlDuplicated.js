const registerUserControlDuplicated = (userDuplicated, res, name, email, phone) => {
    if (userDuplicated) {
        if (userDuplicated.name === name) {
            return res.status(400).json({ message: "El nombre ya está en uso por otro usuario." });
        } else if (userDuplicated.email === email) {
            return res.status(400).json({ message: "El email ya está registrado por otro usuario." });
        } else if (userDuplicated.phone === phone) {
            return res.status(400).json({ message: "El número teléfono ya está registrado por otro usuario." });
        }
    }
};

module.exports = { registerUserControlDuplicated };
