const express = require('express');
const router = express.Router();
const { addOrder, deleteOrder, getUserOrders, getOrderDetails, getAllOrders } = require('../controller/OrderController');

router.post('/addOrder/:userId', addOrder);
router.delete('/deleteOrder/:orderId', deleteOrder);
router.get('/getUserOrders/:userId', getUserOrders);
router.get('/getOrderDetails/:orderId', getOrderDetails);
router.get('/getAllOrders', getAllOrders);
module.exports = router;
