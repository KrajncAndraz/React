var express = require('express');
var router = express.Router();
var commentController = require('../controllers/commentController.js');

function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        var err = new Error("You must be logged in to view this page");
        err.status = 401;
        return next(err);
    }
}

router.post('/', requiresLogin, commentController.create);

router.get('/:photoId', commentController.listByPhoto);

module.exports = router;