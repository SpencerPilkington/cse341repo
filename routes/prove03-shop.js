const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();


router.get('/home',shopController.getIndex);

router.get('/shop',shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);




module.exports = router;