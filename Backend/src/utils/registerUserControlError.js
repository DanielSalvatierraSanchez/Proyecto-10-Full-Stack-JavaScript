const registertUserControlError = (res, name, password, phone, email) => {
    if (!name || !email || !password || !phone) {
        return res.status(400).json({ message: "Todos los campos son obligatorios: Nombre, Email, Contraseña y Teléfono." });
    } else if (name.length < 2 || name.length > 20) {
        return res.status(400).json({ message: "La nombre debe de tener de 2 a 20 caracteres." });
    } else if (password.length < 8 || password.length > 16) {
        return res.status(400).json({ message: "La password debe de entre 8 y 16 caracteres." });
    } else if (phone.length !== 9) {
        return res.status(400).json({ message: "El número de teléfono debe de tener 9 digitos." });
    }
};
module.exports = { registertUserControlError };
