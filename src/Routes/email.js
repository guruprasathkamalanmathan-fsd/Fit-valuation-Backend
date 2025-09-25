const { Router } = require('express');

const emailController = require("../Controller/emailController");
const router = Router();

router.post('/send-Message',emailController.sendMessage);
router.post('/send-User-Message',emailController.sendUserMessage);
router.post('/send-Agent-Message',emailController.sendAgentMessage);
router.post('/send-Email',emailController.sendEmail);
router.post('/send-pdf-Mail',emailController.sendPdfMail);

module.exports = router;
