const { Router } = require('express');

const technicianController = require("../Controller/technicianController");

const router = Router();

router.post("/technician-List",technicianController.technicianList);
router.post("/agent-List",technicianController.agentList);
router.post("/company-List",technicianController.companyList);
router.post("/initiate-Call-To-Customer",technicianController.initiateCallToCustomer);

module.exports = router;