var express = require('express');
// Include multer for file upload
var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/'); // Save files to 'public/images'
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});

// File filter to allow only image files
var fileFilter = function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only image files are allowed!'), false); // Reject the file
    }
};

var upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

var router = express.Router();
var photoController = require('../controllers/photoController.js');

function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        var err = new Error("You must be logged in to view this page");
        err.status = 401;
        return next(err);
    }
}

router.get('/', photoController.list);
//router.get('/publish', requiresLogin, photoController.publish);
router.get('/:id', photoController.show);

// Handle file upload and validate file type
router.post('/', requiresLogin, upload.single('image'), function (err, req, res, next) {
    if (err) {
        return res.status(400).json({ message: err.message }); // Handle invalid file type error
    }
    next();
}, photoController.create);

router.put('/:id', photoController.update);

router.delete('/:id', photoController.remove);

router.put('/:id/like', requiresLogin, photoController.like);

module.exports = router;