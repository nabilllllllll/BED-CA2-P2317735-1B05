const express = require('express');
const router = express.Router();


const controller = require('../controllers/taskController');


router.get('/', controller.readAllTask);
router.post('/', controller.createNewTask);
router.post('/')
router.get('/:id', controller.readTaskById);
router.put('/:id', controller.updateTaskById);
router.delete('/:id', controller.deleteTaskById);

module.exports = router;