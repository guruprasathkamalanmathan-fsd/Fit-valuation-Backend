const { Router } = require('express');
const orderController = require('../Controller/orderController');
const userMiddleware = require('../Middleware/userMiddleware');
const   router = Router();
 
router.post('/order-create',orderController.orderCreate);
router.post('/order-histroy-list',orderController.orderHistoryList);
router.post('/order-histroy-details',orderController.orderHistoryDetails);
router.post('/order-reInitiated',orderController.orderReInitiated);
router.post('/master-order-details',orderController.masterOrderDetailsList);
router.post('/get-activity',orderController.getActivity);


module.exports = router;