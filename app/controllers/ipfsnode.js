var Ipfsnode = require('../models/ipfsnode');
const request = require('request');
const promise = require('promise');
const IPFS = require('ipfs');



exports.startnodefun = async function(req, res){
	
 console.log(req.body);
 var username=req.body.userid;

   startnode(username).then(xx=> {
	console.log("Message = "+xx);	
   }).catch(err=>{
	console.log("Error="+ err);	
   });



}

exports.stopnode = async function(req, res, next){
 console.log(req.body);
 var username=req.body.userid;

   stopnode(username).then(xx=> {
	console.log("Message = "+xx);	
   }).catch(err=>{
	console.log("Error="+ err);	
   });
}
exports.getnodestatus = async function(req, res, next){
}


exports.getipfsconfig = async function(req, res, next){
}




function startnode (user)
{
var url = 'http://localhost:8080/startnode/';
var promise = new Promise(function (resolve, reject) {

    request.get(url + user , function (error, response, body) {
        if (error) {
           reject(error);
        }
       resolve(body);
    });
  });

  return promise;
}

function stopnode (user)
{
var url = 'http://localhost:8080/stopnode/';
var promise = new Promise(function (resolve, reject) {

    request.get(url + user , function (error, response, body) {
        if (error) {
           reject(error);
        }
       resolve(body);
    });
  });

  return promise;
}




