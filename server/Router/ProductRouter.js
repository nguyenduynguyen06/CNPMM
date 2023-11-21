const express = require('express');
const router = express.Router();
const {
  addProduct,
  getProductsByCategory,
  editProduct,
  deleteProduct,
  searchProducts,
  detailsProduct,
  getProductsAll
} = require('../controller/ProductController');
router.post('/addProduct', addProduct);
router.get('/getIdByCategory/:categoryId', getProductsByCategory);
router.get('/getAll/', getProductsAll);
router.put('/editProduct/:id', editProduct);
router.delete('/deleteProduct/:id', deleteProduct);
router.get('/searchProducts', searchProducts);
router.get('/detailsProduct/:name', detailsProduct);
module.exports = router;