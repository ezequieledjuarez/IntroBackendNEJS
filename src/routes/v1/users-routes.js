const express = require('express');

const user_controller = require('../../controllers/v1/users-controller');
const router = express.Router();

router.post('/create', user_controller.createUser);
router.post('/delete', user_controller.deleteUser);
router.post('/get-all', user_controller.getUsers);
router.get('/update', user_controller.updateUser);

module.exports = router;