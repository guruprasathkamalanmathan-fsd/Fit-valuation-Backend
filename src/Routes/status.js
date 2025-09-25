const { Router } = require('express');

const statusController = require("../Controller/statusController");

const router = Router();

router.post('/assign-Agent',statusController.assignAgent);
router.post('/fix-Appointment',statusController.fixAppointment);
router.post('/follow-Up',statusController.followUp);
router.post('/customer-Cancel',statusController.customerCancel);
router.post('/technician-Complete',statusController.technicianComplete);
router.post('/order-ReInitiate',statusController.orderReInitiate);

module.exports = router;