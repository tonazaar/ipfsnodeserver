var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var IpfsusagenSchema = new mongoose.Schema({

	starttime: {
		type: String,
	},
	endtime: {
		type: String,
	},
	activity: {
		type: String,
	},
	file: {
		type: String,
		required: true
	},
	user: {
		type: String,
		required: true
	},
	pinned: {
		type: String,
		default: 'false'
	}

}, {
	timestamps: true
});



module.exports = mongoose.model('Ipfsusage', IpfsusageSchema);
