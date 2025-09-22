const bodyParser = require('body-parser');
const { Router } = require('express');

const user = require('./user');
const location = require('./location');
// const client = require('./client');
// const process = require('./process');
const vehicle = require('./vehicle');
const order = require('./order');
// const email = require('./email');
// const technician = require('./technician');
// const reason = require('./reason');
// const audit = require('./audit');
// const status = require('./status');
// const inspection = require('./inspection');
// const quality = require('./quality');
// const cron = require('./cron');

const jsonParser = bodyParser.json({ limit: "100mb" });
const router = Router();

router.use('/common', jsonParser, user);
router.use('/common', jsonParser, location);
// router.use('/common', jsonParser, client);
// router.use('/common', jsonParser, process);
router.use('/common', jsonParser, vehicle);
router.use('/common', jsonParser, order);
// router.use('/common', jsonParser, email);
// router.use('/common', jsonParser, technician);
// router.use('/common', jsonParser, reason);
// router.use('/common', jsonParser, audit);
// router.use('/common', jsonParser, status);
// router.use('/common', jsonParser, inspection);
// router.use('/common', jsonParser, quality);
// router.use('/common', jsonParser, cron);

module.exports = router;
