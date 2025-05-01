var express = require('express');
var router = express.Router();
var commentController = require('../controllers/commentController.js');
var requiresLogin = require('../middleware/requiresLogin');

router.post('/', requiresLogin, commentController.create);

router.get('/:photoId', commentController.listByPhoto);

module.exports = router;