const { registerUser, getAllUsers, getUserByName, getUserByPhone, updateUser, deleteUser } = require('../controllers/users');
const usersRoutes = require('express').Router();

usersRoutes.post('/register', registerUser)
usersRoutes.get('/getByName/:name', getUserByName)
usersRoutes.get('/getByPhone/:phone', getUserByPhone)
usersRoutes.get('/', getAllUsers)
usersRoutes.put('/update/:id', updateUser)
usersRoutes.delete('/delete/:id', deleteUser)

module.exports = usersRoutes;