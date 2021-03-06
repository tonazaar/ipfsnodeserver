var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var IpfsnodeSchema = new mongoose.Schema({

	starttime: {
		type: String,
		required: true
	},
	endtime: {
		type: String,
		required: true
	},
	startminutes: {
		type: Number,
		required: true
	},
	endminutes: {
		type: Number,
		required: true
        }, 
	activity: {
		type: String,
		required: true
	},
	usage: {
		type: String,
		required: true
	},
	user: {
		type: String,
		required: true
	},
	role: {
		type: String,
		enum: ['reader', 'creator', 'editor'],
		default: 'reader'
	}

}, {
	timestamps: true
});



module.exports = mongoose.model('Ipfsnode', IpfsnodeSchema);
