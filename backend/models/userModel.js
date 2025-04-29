var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	'username': {
		type: String,
		required: [true, 'Username is required'],
		unique: true,
		trim: true
	},
	'password': {
		type: String,
		required: [true, 'Password is required'],
		minlength: [4, 'Password must be at least 4 characters long']
	},
	'email': {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
		trim: true,
		lowercase: true
	}
});

userSchema.pre('save', function (next) {
	var user = this;
	if (!user.isModified('password')) return next(); // Only hash if password is modified
	bcrypt.hash(user.password, 10, function (err, hash) {
		if (err) {
			return next(err);
		}
		user.password = hash;
		next();
	});
});

userSchema.statics.authenticate = function (username, password, callback) {
	User.findOne({ username: username })
		.exec(function (err, user) {
			if (err) {
				return callback(err);
			} else if (!user) {
				var err = new Error("User not found.");
				err.status = 401;
				return callback(err);
			}
			bcrypt.compare(password, user.password, function (err, result) {
				if (result === true) {
					return callback(null, user);
				} else {
					return callback();
				}
			});
		});
};

var User = mongoose.model('user', userSchema);
module.exports = User;
