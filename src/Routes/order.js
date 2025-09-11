const { Router } = require('express');
const orderController = require('../Controller/orderController');
const userMiddleware = require('../Middleware/userMiddleware');
const   router = Router();
 
router.post('/order-create',orderController.orderCreate);
router.post('/order-histroy-list',orderController.orderHistoryList);


module.exports = router;