const express = require('express');
const router = express.Router();


const controller = require('../controllers/taskProgressController');



router.post('/', controller.createNewProgress);
router.get('/:id', controller.readProgressById);
router.get('/', controller.readAllProgress);
// router.put('/:id', controller.updateProgressById);
router.delete('/:id', controller.deleteProgressById);

module.exports = router;