const { Router } = require('express');
const vehicleController = require('../Controller/vehicleController');
const userMiddleware = require('../Middleware/userMiddleware');
const   router = Router();

router.post('/vehicle-make-list', vehicleController.vehicleMakeList);
router.post('/vehicle-model-list', vehicleController.vehicleModelList);
router.post('/vehicle-variant-list', vehicleController.vehicleVariantList);
router.post('/vehicle-validate-number', vehicleController.vehicleValidateNumber);
router.post('/image-list', vehicleController.imageList);


module.exports = router;