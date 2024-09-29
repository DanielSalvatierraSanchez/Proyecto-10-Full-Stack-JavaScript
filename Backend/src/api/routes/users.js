const { isAuth } = require("../../middlewares/isAuth");
const { registerUser, getAllUsers, getUserByName, getUserByPhone, updateUser, deleteUser, loginUser } = require("../controllers/users");
const usersRoutes = require("express").Router();

usersRoutes.post("/register", registerUser);
usersRoutes.post("/login", loginUser);
usersRoutes.get("/getByName/:name", isAuth, getUserByName);
usersRoutes.get("/getByPhone/:phone", isAuth, getUserByPhone);
usersRoutes.get("/", isAuth, getAllUsers);
usersRoutes.put("/update/:id", updateUser); // isAuth,
usersRoutes.delete("/delete/:id", isAuth, deleteUser); // isAuth,

module.exports = usersRoutes;
