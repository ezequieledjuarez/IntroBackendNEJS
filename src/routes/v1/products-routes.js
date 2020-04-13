const express = require('express');

const products_controller = require('../../controllers/v1/products-controller');

const router = express.Router();

router.post('/create', products_controller.createProduct);
router.get('/get-all', products_controller.getProducts);
router.get('/get-by-user/:userId', products_controller.getProductsByUser);


module.exports = router;