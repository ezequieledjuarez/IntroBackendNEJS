const express = require('express');

const user_controller = require('../../controllers/v1/users-controller');
const router = express.Router();

router.post('/create', user_controller.createUser);
router.post('/delete', user_controller.deleteUser);
router.post('/get-all', user_controller.getUsers);
router.post('/update', user_controller.updateUser);
router.post('/login', user_controller.logIn);

module.exports = router;