var AuthenticationController = require('./controllers/authentication'),  
    IpfsnodeController = require('./controllers/ipfsnode'),  
    IpfsusageController = require('./controllers/ipfsusage'),  
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});

module.exports = function(app){

    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        ipfsnodeRoutes = express.Router();
        ipfsusageRoutes = express.Router();

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);

    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);

    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Login Success'});
    });


    apiRoutes.use('/ipfsnode', ipfsnodeRoutes);
    ipfsnodeRoutes.post('/getnodestatus',  IpfsnodeController.getnodestatus);
    ipfsnodeRoutes.post('/startnode',  IpfsnodeController.startnodefun);
    ipfsnodeRoutes.post('/stopnode',  IpfsnodeController.stopnode);
    ipfsnodeRoutes.post('/getipfsconfig',  IpfsnodeController.getipfsconfig);

    apiRoutes.use('/ipfsusage', ipfsusageRoutes);
    ipfsusageRoutes.post('/getusage',  IpfsusageController.getusage);
    ipfsusageRoutes.post('/savefile',  IpfsusageController.savefile);
    ipfsusageRoutes.post('/deletefile',  IpfsusageController.deletefile);
    ipfsusageRoutes.post('/listfiles',  IpfsusageController.listfiles);


    app.use('/api', apiRoutes);

}
