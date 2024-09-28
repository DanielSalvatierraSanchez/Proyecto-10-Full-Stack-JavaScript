const User = require("../models/users");

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, phone } = req.body;

        if (name.length < 2 || name.length > 20) {
            return res.status(400).json({ message: "La nombre debe de tener de 2 a 20 caracteres." });
        }
        if (password.length < 8 || password.length > 16) {
            return res.status(400).json({ message: "La password debe de entre 8 y 16 caracteres." });
        }
        if (phone.length !== 9) {
            return res.status(400).json({ message: "El número de teléfono debe de tener 9 digitos." });
        }

        const userDuplicated = await User.findOne({ $or: [{ name }, { email }, { phone }] });
        if (userDuplicated) {
            return res.status(400).json({ message: "El nombre o el email o el teléfono ya están en uso por otro usuario." });
        }

        const newUser = new User(req.body);
        const userSaved = await newUser.save();
        return res.status(201).json({ message: "Usuario creado correctamente.", userSaved });
    } catch (error) {
        return res.status(400).json(`❌ Fallo en registerUser: ${error.message}`);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await User.find().select("-password, -role, -email").populate("match");
        allUsers.length ? res.status(200).json({ message: "Listado completo de usuarios.", allUsers }) : res.status(400).json({ message: "¡Hola! Eres el único usuario que existe... por ahora..." });
    } catch (error) {
        return res.status(400).json(`❌ Fallo en getAllUsers: ${error.message}`);
    }
};

const getUserByName = async (req, res, next) => {
    try {
        const { name } = req.params;
        const searchUserByName = await User.find({ name: new RegExp(name, "i") }).select("-password -role -email").populate("match");
        searchUserByName.length
            ? res.status(200).json({ message: `Listado de usuarios con el nombre ${name} : `, searchUserByName })
            : res.status(400).json({ message: `No se ha encontrado ningún usuario con ese nombre: ${name}` });
    } catch (error) {
        return res.status(400).json(`❌ Fallo en getUserByName: ${error.message}`);
    }
};

const getUserByPhone = async (req, res, next) => {
    try {
        const { phone } = req.params;
        if (phone.length !== 9) {
            return res.status(400).json("Introduce un número de teléfono de 9 digitos.");
        }
        const searchUserByPhone = await User.find({ phone }).select("-password, -role, -email").populate("match");
        searchUserByPhone.length
            ? res.status(200).json({ message: `El número de teléfono ${phone} corresponde al usuario: `, searchUserByPhone })
            : res.status(400).json({ message: `No se ha encontrado ningún usuario con el número de teléfono ${phone}` });
    } catch (error) {
        return res.status(400).json(`❌ Fallo en getUserByPhone: ${error.message}`);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const {  } = req.body;

    } catch (error) {
        return res.status(400).json(`❌ Fallo en updateUser: ${error.message}`);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userDeleted = await User.findByIdAndDelete(id)
        userDeleted ? res.status(200).json({ message: `Usuario eliminado correctamente.`, userDeleted })
        : res.status(400).json({ message: `No se puede eliminar ese usuario ya que no existe.` });
    } catch (error) {
        return res.status(400).json(`❌ Fallo en deleteUser: ${error.message}`);
    }
};

module.exports = { registerUser, getAllUsers, getUserByName, getUserByPhone, updateUser, deleteUser };
