var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    text: {
        type: String,
        required: [true, 'Comment text is required']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Author is required']
    },
    photo: {
        type: Schema.Types.ObjectId,
        ref: 'photo',
        required: [true, 'Photo is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('comment', commentSchema);