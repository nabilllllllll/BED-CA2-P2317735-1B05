//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const express = require('express');

//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////
const router = express.Router();
const usercontroller = require('../controllers/userController');

//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////
// GET all users
router.get('/', usercontroller.readAllUser);
router.get('/:id', usercontroller.readUserById);
// POST create a new user
router.post('/', usercontroller.checkUsernameOrEmailExist, usercontroller.register);

// POST login
router.post('/login', usercontroller.login);

// POST register
router.post('/register', usercontroller.checkUsernameOrEmailExist, usercontroller.register);

router.put('/:id', usercontroller.updateUserById);

//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;