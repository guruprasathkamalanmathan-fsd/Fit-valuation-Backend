const { Router } = require('express');

const reasonController = require("../Controller/reasonController");
const router = Router();

// router.use(userMiddleware.validateHeaders);

router.post('/cancel-reason', reasonController.cancelReasonList);
router.post('/followup-reason', reasonController.followReasonList);
router.post('/upload-images', reasonController.uploadImage);
router.post('/upload-videos', reasonController.uploadVideo);
router.post('/list-files', reasonController.listFiles);

module.exports = router;