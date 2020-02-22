var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var IpfsusageSchema = new mongoose.Schema({

	starttime: {
		type: String,
	},
	endtime: {
		type: String,
	},
	activity: {
		type: String,
	},
	name: {
		type: String,
		required: true
	},
	hash: {
		type: String,
	},
	path: {
		type: String,
		required: true
	},
	cid: {
		type: String,
		required: true
	},
	userid: {
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
