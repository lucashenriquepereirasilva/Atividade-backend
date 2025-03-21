const express = require('express'); 
const router = express.Router(); 

const userController = require('../controllers/userController.js'); 
router.post('/users', userController.createUser); 
router.get('/users', userController.getUsers); 
router.put('/users/:id', userController.updateUser); 
router.delete('/users/:id', userController.deleteUser); 
router.post('/users/login:id', userController.loginUser)
module.exports = router;

