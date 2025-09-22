const { Router } = require('express');

const clientController = require("../Controller/clientController");
const router = Router();

router.post('/client-list',clientController.clientList)

module.exports = router;