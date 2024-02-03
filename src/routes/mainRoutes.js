const express = require('express');
const router = express.Router();

const exampleController = require('../controllers/exampleController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware');
const userRoutes = require('./userRoutes');
const userController = require('../controllers/userController');
const taskRoutes = require('./taskRoutes')
const taskController = require('../controllers/taskController')
const taskProgressRoutes = require('./taskProgressRoutes');
const messageController = require('../controllers/messageController');
const messageRoutes = require('./messageRoutes');
//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////
router.use("/user", userRoutes);
router.use("/task", taskRoutes);
router.use("/progress", taskProgressRoutes);
router.use("/messages", messageRoutes);
router.put("/taskprogress", taskController.addPoints);
router.get("/username", userController.getusername);
router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register", userController.checkUsernameOrEmailExist, userController.register, bcryptMiddleware.hashPassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

router.post("/jwt/generate", exampleController.preTokenGenerate, jwtMiddleware.generateToken, exampleController.beforeSendToken, jwtMiddleware.sendToken);
router.get("/jwt/verify", jwtMiddleware.verifyToken, exampleController.showTokenVerified);
router.post("/bcrypt/compare", exampleController.preCompare, bcryptMiddleware.comparePassword, exampleController.showCompareSuccess);
router.post("/bcrypt/hash", bcryptMiddleware.hashPassword, exampleController.showHashing);

//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;