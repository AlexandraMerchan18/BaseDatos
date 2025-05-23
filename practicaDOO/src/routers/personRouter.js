const express = require('express');
const router = express.Router();
const ServerController = require('../controllers/serverController').default;
const controller = new ServerController();

router.get('/personas', controller.getAllUsers.bind(controller));
router.get('/personas/:id', controller.getUsers.bind(controller));
router.post('/personas', controller.createUser.bind(controller));
router.put('/personas/:id', controller.updateUser.bind(controller));
router.delete('/personas/:id', controller.deleteUser.bind(controller));

module.exports = router;