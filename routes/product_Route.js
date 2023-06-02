var express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controller/productController');
const  {isAuthentication, authorizeRoles}  = require('../middleware/auth');
var router = express.Router();


router.route('/products').get(isAuthentication, getAllProducts).post(isAuthentication, createProduct)
router.route('/products/:id').get(isAuthentication, getProductDetails).put(isAuthentication, updateProduct).delete(isAuthentication, deleteProduct)


module.exports = router;
