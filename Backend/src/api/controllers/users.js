const bcrypt = require("bcrypt");
const User = require("../models/users");
const { generateToken } = require("../../utils/jwt");
const { resultUsersByName } = require("../../utils/resultUsersByName");
const { resultUsersByPhone } = require("../../utils/resultUsersByPhone");
const { resultUserDeleted } = require("../../utils/resultUserDeleted");
const { registerUserControlDuplicated } = require("../../utils/registerUserControlDuplicated");
const { registertUserParamsError } = require("../../utils/registerUserParamsError");
const { selectUserData } = require("../../utils/selectUserData");
const { idAndRoleChecked } = require("../../utils/checkId&Role");
const { deleteImage } = require("../../utils/deleteImage");
const PadelMatch = require("../models/padelMatches");

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, phone } = req.body;

        const userParamsError = registertUserParamsError(name, password, phone, email);
        if (userParamsError) {
            return res.status(400).json({ message: userParamsError });
        }

        const userDuplicated = await User.findOne({ $or: [{ name }, { email }, { phone }] });
        const errorDuplicated = registerUserControlDuplicated(userDuplicated, name, email, phone);
        if (userDuplicated) {
            return res.status(400).json({ message: errorDuplicated });
        }

        const newUser = new User(req.body);
        if (newUser.role === "admin") {
            return res.status(400).json({ message: "No tienes permisos para tener el rol de Administrador." });
        }
        if (req.file) {
            newUser.image = req.file.path;
        }

        const userSaved = await newUser.save();
        return res.status(201).json({ message: "Usuario creado correctamente.", userSaved });
    } catch (error) {
        return res.status(400).json(`❌ Fallo en registerUser: ${error.message}`);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { userData, password } = req.body;
        const userLogin = await User.findOne({ $or: [{ name: userData }, { email: userData }] });
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
        const allUsers = await User.find().select(selectUserData(user)).populate("padelMatches");
        res.status(200).json({ message: "Listado completo de usuarios:", allUsers });
    } catch (error) {
        return res.status(400).json(`❌ Fallo en getAllUsers: ${error.message}`);
    }
};

const getUserByName = async (req, res, next) => {
    try {
        const user = req.user;
        const { name } = req.params;
        const searchUserByName = await User.find({ name: new RegExp(name, "i") })
            .select(selectUserData(user))
            .populate("padelMatches");
        resultUsersByName(res, searchUserByName, name);
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
        const searchUserByPhone = await User.find({ phone }).select(selectUserData(user)).populate("padelMatches");
        resultUsersByPhone(res, searchUserByPhone, phone);
    } catch (error) {
        return res.status(400).json(`❌ Fallo en getUserByPhone: ${error.message}`);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const { name, email, password, phone, role, padelMatches } = req.body;

        const userChecked = idAndRoleChecked(id, user);
        if (userChecked) {
            return res.status(400).json({ message: userChecked });
        }

        const userDuplicated = await User.findOne({ $or: [{ name }, { email }, { phone }] });

        const errorDuplicated = registerUserControlDuplicated(userDuplicated, name, email, phone);
        if (userDuplicated) {
            return res.status(400).json({ message: errorDuplicated });
        }

        const oldUser = await User.findById(id);
        const newUser = new User(req.body);
        newUser._id = id;

        if (password) {
            if (password.length < 8 || password.length > 16) {
                return res.status(400).json({ message: "La contraseña debe de tener entre 8 y 16 caracteres." });
            }
            const newPassword = bcrypt.hashSync(password, 10);
            newUser.password = newPassword;
            // return res.status(200).json({ message: "Contraseña modificada correctamente." });
        }

        if (user.role !== "admin") {
            newUser.role = oldUser.role;
            // return res.status(400).json({ message: "Sólo un Administrador puede cambiarte el rol." });
        }

        if (req.file) {
            deleteImage(oldUser.image);
            newUser.image = req.file.path;
            // return res.status(200).json({ message: "Imagen modificada correctamente." });
        }

        // if (padelMatches) {
        //     newUser.padelMatches = [...newUser.padelMatches, ...oldUser.padelMatches];
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

        const userChecked = idAndRoleChecked(id, user);
        if (userChecked) {
            return res.status(400).json({ message: userChecked });
        }

        const userDeleted = await User.findByIdAndDelete(id);
        deleteImage(userDeleted.image);
        resultUserDeleted(res, userDeleted);
    } catch (error) {
        return res.status(400).json(`❌ Fallo en deleteUser: ${error.message}`);
    }
};

module.exports = { registerUser, loginUser, getAllUsers, getUserByName, getUserByPhone, updateUser, deleteUser };
