var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var photoSchema = new Schema({
	'name' : String,
	'path' : String,
	'postedBy' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	},
	'views' : Number,
	'likes': Number,
	'createdAt': {
		type: Date,
		default: Date.now
	},
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'user' }]
});

module.exports = mongoose.model('photo', photoSchema);
