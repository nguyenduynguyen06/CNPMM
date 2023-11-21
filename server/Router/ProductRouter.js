const express = require('express');
const router = express.Router();
const {
  addProduct,
  getProductsByCategory,
  editProduct,
  deleteProduct,
  searchProducts,
  detailsProduct,
  getProductsAll,
  addCodes,
} = require('../controller/ProductController');
const { authMiddleware } = require('../middleware/authMiddleware');
router.post('/addProduct', authMiddleware,addProduct);
router.post('/addCodes/:productId',addCodes);
router.get('/getIdByCategory/:categoryId', getProductsByCategory);
router.get('/getAll/', authMiddleware,getProductsAll);
router.put('/editProduct/:id',authMiddleware, editProduct);
router.delete('/deleteProduct/:id',authMiddleware, deleteProduct);
router.get('/searchProducts', searchProducts);
router.get('/detailsProduct/:name', detailsProduct);
module.exports = router;