const IPFS = require('ipfs');
var Ipfsusage = require('../models/ipfsusage');



exports.checkpinning = async function(req, res, next){

};

exports.savefile = async function(req, res, next){

    Ipfsusage.create({
        path : req.body.path,
        name : req.body.name,
        hash : req.body.hash,
        cid : req.body.cid,
        userid: req.body.userid,
        done : false
    }, function(err, todo) {
	   if(err) {
        res.json(err);
	   } else {
        res.json(todo);
	    }

    })


}

exports.deletefile = async function(req, res, next){
    Ipfsusage.remove({
        hash : req.params.hash
    }, function(err, todo) {
        res.json(todo);
    });

}

exports.getfile = async function(req, res, next){

	 Ipfsusage.find( {hash: req.params.hash}, function(err, posts) {

            if (err){
                res.send(err);
            }
            else {
            res.json(posts);
            }


        });

}

exports.listfiles = async function(req, res, next){

         Ipfsusage.find( {userid: req.body.userid}, function(err, posts) {

            if (err){
                res.send(err);
            }
            else {
            res.json(posts);
            }


        });

}


exports.getusage = async function(req, res, next){

}




