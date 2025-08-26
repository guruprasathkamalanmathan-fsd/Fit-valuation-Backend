const { Router } = require('express');

const userMiddleware = require('../Middleware/userMiddleware');
const userController = require('../Controller/userController');

const   router = Router();
 
// router.use(userMiddleware.validateHeaders);

router.post('/login', userController.login);
router.post('/handlePassword', userController.handlePassword); // changed through flag -- action (reset / forgot )
router.post('/logout', userController.logout);
router.post('/upload-image', userController.uploadImage);
router.post('/user-deactivate-job', userController.deactivateUserCronJob);
// router.post('/send-user-login-email', userController.sendUserLoginEmail);
router.post('/reset-password-fingerprint', userController.fingerPrintPassword);
router.post('/upload-user-information', userController.uploadUserInformation);

module.exports = router;
