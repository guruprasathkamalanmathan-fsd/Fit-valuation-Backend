const { Router } = require('express');

const locationController = require("../Controller/locationController");

const   router = Router();

router.post('/city-list', locationController.cityList);
router.post('/district-list', locationController.districtList);
router.post('/state-list', locationController.stateList);
router.post('/master-state-city-list', locationController.stateCityList);

module.exports = router;