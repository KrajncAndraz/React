var CommentModel = require('../models/commentModel.js');

module.exports = {
    create: function (req, res) {
        var comment = new CommentModel({
            text: req.body.text,
            author: req.session.userId,
            photo: req.body.photoId
        });

        comment.save(function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating comment',
                    error: err
                });
            }

            return res.status(201).json(comment);
        });
    },

    listByPhoto: function (req, res) {
        var photoId = req.params.photoId;

        CommentModel.find({ photo: photoId })
            .populate('author', 'username')
            .sort({ createdAt: -1 }) // Sort by newest first
            .exec(function (err, comments) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting comments',
                        error: err
                    });
                }

                return res.json(comments);
            });
    }
};