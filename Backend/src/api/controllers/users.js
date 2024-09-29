const bcrypt = require("bcrypt");
const { registertUserControlError } = require("../../utils/registerUserControlError");
const User = require("../models/users");
const { generateToken } = require("../../utils/jwt");
const { resultAllUsers } = require("../../utils/resultAllUsers");
const { resultUsersByName } = require("../../utils/resultUsersByName");
const { resultUsersByPhone } = require("../../utils/resultUsersByPhone");
const { resultUserDeleted } = require("../../utils/resultUserDeleted");

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, phone } = req.body;
        registertUserControlError(res, name, password, phone, email);

        const userDuplicated = await User.findOne({ $or: [{ name }, { email }, { phone }] });
        if (userDuplicated) {
            if (userDuplicated.name === name) {
                return res.status(400).json({ message: "El nombre ya están en uso por otro usuario." });
            } else if (userDuplicated.email == email) {
                return res.status(400).json({ message: "El email ya está registrado por otro usuario." });
            } else if (userDuplicated.phone == phone) {
                return res.status(400).json({ message: "El número de teléfono ya está registrado por otro usuario." });
            }
        }

        const newUser = new User(req.body);
        const userSaved = await newUser.save();
        return res.status(201).json({ message: "Usuario creado correctamente.", userSaved });
    } catch (error) {
        return res.status(400).json(`❌ Fallo en registerUser: ${error.message}`);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userLogin = await User.findOne({ email });
        if (userLogin) {
            if (bcrypt.compareSync(password, userLogin.password)) {
                const token = generateToken(userLogin._id);
                return res.status(200).json({ message: "LOGIN realizado correctamente.", userLogin, token });
            } else {
                return res.status(400).json({ message: "El email o la contraseña son incorrectos." });
            }
        } else {
            return res.status(400).json({ message: "El email no existe." });
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
        const { name } = req.params;
        const user = req.user;

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
        const { phone } = req.params;
        const user = req.user;

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
        const {} = req.body;
    } catch (error) {
        return res.status(400).json(`❌ Fallo en updateUser: ${error.message}`);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.user

        if (user._id.toString() !== id && user.role !== 'admin') {
            return res.status(400).json({ message: 'No tienes permisos de Administrador para eliminar el usuario.' })
        }
        const userDeleted = await User.findByIdAndDelete(id);
        resultUserDeleted(res, userDeleted)
    } catch (error) {
        return res.status(400).json(`❌ Fallo en deleteUser: ${error.message}`);
    }
};

module.exports = { registerUser, loginUser, getAllUsers, getUserByName, getUserByPhone, updateUser, deleteUser };
