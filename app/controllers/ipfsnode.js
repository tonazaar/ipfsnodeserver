var Ipfsnode = require('../models/ipfsnode');
const IPFS = require('ipfs');
const Ctl = require('ipfsd-ctl')


var    ipfsd1 ;
var    ipfsd2 ;
var    factory1 ;
var    factory2 ;


var setup = [
	{
	name:"user1",
	port: 5001,
        ipaddress : "0.0.0.0"
        },
	{
	name:"user2",
	port: 5002,
        ipaddress : "0.0.0.0"
        },
];

var config1 = {
"Addresses": {
    "Swarm": [
      "/ip4/0.0.0.0/tcp/6002",
      "/ip4/127.0.0.1/tcp/6003/ws"
    ],
    "API": "/ip4/0.0.0.0/tcp/5001",
    "Gateway": "/ip4/127.0.0.1/tcp/9090",
    "Delegates": []
  }

};

var config2 = {
         "Addresses": {
    "Swarm": [ 
      "/ip4/0.0.0.0/tcp/7002",
      "/ip4/127.0.0.1/tcp/4003/ws"
    ],
    "API": "/ip4/127.0.0.1/tcp/5002",
    "Gateway": "/ip4/0.0.0.0/tcp/9001",
    "Delegates": []
  }
};

/*
app.get('/', (req, res) => {
    return res.send('Welcome to my IPFS app');
});

app.get('/startnode/:userid', async (req, res) => {
var userid=req.params.userid;
console.log(req.params);

var id ;
   if(userid == 'user1') {
    await user1server() ;
    id = await ipfsd1.api.id();
    console.log("ipfsid="+JSON.stringify(id));
   }
   if(userid == 'user2') {
    await user2server() ;
    id = await ipfsd2.api.id();
    console.log("ipfsid="+JSON.stringify(id));
   }
    return res.send('Started nodes  ');
});

app.get('/stopnode/:userid', async (req, res) => {
var userid=req.params.userid;
var id ;
   if(userid == 'user2') {
      if(!ipfsd2) {
       return res.send('Node not running ');
       }
    try {
    id = await ipfsd2.api.id();
    console.log("Before stopping ipfsid="+JSON.stringify(id));
    await ipfsd2.stop();

    }catch (err) {
	    console.log ("ipfsd2 err="+ err);
    }
    // id = await ipfsd2.api.id();
    //console.log("After stopping ipfsid="+JSON.stringify(id));
   }
   if(userid == 'user1') {
      if(!ipfsd1) {
       return res.send('Node not running ');
       }
   try {
    id = await ipfsd1.api.id();
    console.log("Before stopping ipfsid="+JSON.stringify(id));
    // await factory2.clean();
    await ipfsd1.stop();
    }catch (err) {
	    console.log ("ipfsd1 err="+ err);
    }
   }
    return res.send('Stopped nodes  ');
});

app.get('/getporttouse/:userid', (req, res) => {
var userid=req.params.userid;
//	req.param 
   if(userid == 'user2') {
     return res.json(setup[1]);
   }
   if(userid == 'user1') {
     return res.json(setup[0]);
   }


});

*/

async function user1server() 
{
ipfsd1 = await factory1.spawn() // Spawns using options from `createFactory`

var id = ipfsd1.api.id();
console.log(ipfsd1.api.id())
	return ipfsd1;
}


async function user2server() 
{
ipfsd2 = await factory2.spawn() // Spawns using options from `createFactory`
console.log(ipfsd2.api.id())



}


function createfactories() {
factory1 = Ctl.createFactory({ type: 'js', 
	ipfsOptions: {
        repo: '/home/rameshbn/ramipfs',
        config: config1
		 },
	test: true, disposable: true })
factory2 = Ctl.createFactory({ type: 'js', 
	ipfsOptions: {
        repo: '/home/rameshbn/ramipfs1',
        config: config2
		 },
	test: true, disposable: true })
}

exports.initnode = async function(req, res, next){
createfactories() ;

};

exports.startnode = async function(req, res, next){
    var userid=req.params.userid;
console.log(req.params);

var id ;
   if(userid == 'user1') {
    await user1server() ;
    id = await ipfsd1.api.id();
    console.log("ipfsid="+JSON.stringify(id));
   }   
   if(userid == 'user2') {
    await user2server() ;
    id = await ipfsd2.api.id();
    console.log("ipfsid="+JSON.stringify(id));
   }   
    return res.send('Started nodes  ');



}
