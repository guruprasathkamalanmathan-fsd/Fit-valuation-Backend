const { Router } = require('express');

const processController = require("../Controller/processController");
const router = Router();

router.post('/process-list',processController.processList);
router.post('/status-list',processController.statusList);

module.exports = router;