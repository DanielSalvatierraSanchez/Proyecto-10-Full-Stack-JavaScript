const bcrypt = require("bcrypt");
const User = require("../models/users");
const { generateToken } = require("../../utils/jwt");
const { resultAllUsers } = require("../../utils/resultAllUsers");
const { resultUsersByName } = require("../../utils/resultUsersByName");
const { resultUsersByPhone } = require("../../utils/resultUsersByPhone");
const { resultUserDeleted } = require("../../utils/resultUserDeleted");

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, phone } = req.body;

        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: "Todos los campos son obligatorios: Nombre, Email, Contraseña y Teléfono." });
        } else if (name.length < 2 || name.length > 20) {
            return res.status(400).json({ message: "El nombre debe de tener de 2 a 20 caracteres." });
        } else if (password.length < 8 || password.length > 16) {
            return res.status(400).json({ message: "La contraseña debe de tener entre 8 y 16 caracteres." });
        } else if (phone.length !== 9) {
            return res.status(400).json({ message: "El número de teléfono debe de tener 9 dígitos." });
        }

        const userDuplicated = User.findOne({ $or: [{ name }, { email }, { phone }] });
        if (userDuplicated) {
            if (userDuplicated.name == name) {
                return res.status(400).json({ message: "El nombre ya está registrado por otro usuario." });
            } else if (userDuplicated.email == email) {
                return res.status(400).json({ message: "El email ya está registrado por otro usuario." });
            } else if (userDuplicated.phone == phone) {
                return res.status(400).json({ message: "El número de teléfono ya está registrado por otro usuario." });
            }
        }

        const newUser = new User(req.body);
        if (req.file) {
            newUser.image = req.file.path
        }
        const userSaved = await newUser.save();
        return res.status(201).json({ message: "Usuario creado correctamente.", userSaved });
    } catch (error) {
        return res.status(400).json(`❌ Fallo en registerUser: ${error.message}`);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { name, password } = req.body;
        const userLogin = await User.findOne({ name });
        if (!userLogin) {
            return res.status(400).json({ message: "Usuario o contraseña incorrectos." });
        }
        if (bcrypt.compareSync(password, userLogin.password)) {
            const token = generateToken(userLogin._id);
            return res.status(200).json({ message: "LOGIN realizado correctamente.", userLogin, token });
        } else {
            return res.status(400).json({ message: "Usuario o contraseña incorrectos." });
        }
    } catch (error) {
        return res.status(400).json(`❌ Fallo en loginUser: ${error.message}`);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const user = req.user;

        if (user.role === "admin") {
            const allUsers = await User.find().populate("match");
            resultAllUsers(res, allUsers);
        } else {
            const allUsers = await User.find().select("-password -role -email").populate("match");
            resultAllUsers(res, allUsers);
        }
    } catch (error) {
        return res.status(400).json(`❌ Fallo en getAllUsers: ${error.message}`);
    }
};

const getUserByName = async (req, res, next) => {
    try {
        const user = req.user;
        const { name } = req.params;

        if (user.role === "admin") {
            const searchUserByName = await User.find({ name: new RegExp(name, "i") }).populate("match");
            resultUsersByName(res, searchUserByName, name);
        } else {
            const searchUserByName = await User.find({ name: new RegExp(name, "i") })
                .select("-password -role -email")
                .populate("match");
            resultUsersByName(res, searchUserByName, name);
        }
    } catch (error) {
        return res.status(400).json(`❌ Fallo en getUserByName: ${error.message}`);
    }
};

const getUserByPhone = async (req, res, next) => {
    try {
        const user = req.user;
        const { phone } = req.params;

        if (phone.length !== 9) {
            return res.status(400).json("Introduce un número de teléfono de 9 digitos.");
        }
        if (user.role === "admin") {
            const searchUserByPhone = await User.find({ phone }).populate("match");
            resultUsersByPhone(res, searchUserByPhone, phone);
        } else {
            const searchUserByPhone = await User.find({ phone }).select("-password -role -email").populate("match");
            resultUsersByPhone(res, searchUserByPhone, phone);
        }
    } catch (error) {
        return res.status(400).json(`❌ Fallo en getUserByPhone: ${error.message}`);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const { name, email, password, phone, role, match } = req.body;

        if (user._id.toString() !== id && user.role !== "admin") {
            return res.status(400).json({ message: "No puedes actualizar a otro usuario, únicamente puede un Administrador." });
        }

        const userDuplicated = await User.findOne({ $or: [{ name }, { email }, { phone }] });
        if (userDuplicated) {
            if (userDuplicated.name == name) {
                return res.status(400).json({ message: "El nombre ya está registrado por otro usuario." });
            } else if (userDuplicated.email == email) {
                return res.status(400).json({ message: "El email ya está registrado por otro usuario." });
            } else if (userDuplicated.phone == phone) {
                return res.status(400).json({ message: "El número de teléfono ya está registrado por otro usuario." });
            }
        }

        const newUser = new User(req.body);
        newUser._id = id;

        if (req.file) {
            const oldUser = await User.findById(id);
            deleteFile(oldUser.image)
            newUser.image = req.file.path
        }

        if (password) {
            if (password.length < 8 || password.length > 16) {
                return res.status(400).json({ message: "La contraseña debe de tener entre 8 y 16 caracteres." });
            }
            const newPassword = bcrypt.hashSync(password, 10);
            newUser.password = newPassword;
        }
        // if (role) {
        //     if (user.role === "admin") {
        //         newUser.role = role
        //     }
        // }    
        // if (match) {
        //     user.match.$addToSet = { match: padelMatches }
        // }

        const userUpdated = await User.findByIdAndUpdate(id, newUser, { new: true });
        return res.status(200).json({ message: "Datos del usuario actualizados correctamente.", userUpdated });
    } catch (error) {
        return res.status(400).json(`❌ Fallo en updateUser: ${error.message}`);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.user;

        if (user._id.toString() !== id && user.role !== "admin") {
            return res.status(400).json({ message: "No puedes eliminar a otro usuario, únicamente puede hacerlo un Administrador." });
        }
        const userDeleted = await User.findByIdAndDelete(id);
        resultUserDeleted(res, userDeleted);
    } catch (error) {
        return res.status(400).json(`❌ Fallo en deleteUser: ${error.message}`);
    }
};

module.exports = { registerUser, loginUser, getAllUsers, getUserByName, getUserByPhone, updateUser, deleteUser };
