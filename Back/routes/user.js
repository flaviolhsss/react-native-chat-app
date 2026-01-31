const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')
const auth = require('../middleware/auth')

router.get('/tokenisenable', auth, userController.tokenIsEnable);
router.get('/getmessages', auth, userController.getMessages);
router.post('/signup', userController.signUp);
router.post('/sendmessage', auth, userController.sendMessage);

module.exports = router;
