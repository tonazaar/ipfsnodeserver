var AuthenticationController = require('./controllers/authentication'),  
    TodoController = require('./controllers/todos'),  
    BookingController = require('./controllers/booking'),  
    IpfsnodeController = require('./controllers/ipfsnode'),  
    IpfsusageController = require('./controllers/ipfsusage'),  
    PostController = require('./controllers/post'),  
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});

module.exports = function(app){

    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        todoRoutes = express.Router();
        bookingRoutes = express.Router();
        ipfsnodeRoutes = express.Router();
        ipfsusageRoutes = express.Router();
        postRoutes = express.Router();

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);

    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);

    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });

    // Todo Routes
    apiRoutes.use('/todos', todoRoutes);

    todoRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), TodoController.getTodos);
    todoRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['creator','editor']), TodoController.createTodo);
    todoRoutes.delete('/:todo_id', requireAuth, AuthenticationController.roleAuthorization(['editor']), TodoController.deleteTodo);


    apiRoutes.use('/ipfsnode', ipfsnodeRoutes);
    ipfsnodeRoutes.post('/getnodestatus',  IpfsnodeController.getnodestatus);
    ipfsnodeRoutes.get('/startnode/:userid',  IpfsnodeController.startnode);
    ipfsnodeRoutes.get('/stopnode/:userid',  IpfsnodeController.stopnode);
    ipfsnodeRoutes.post('/getipfsconfig',  IpfsnodeController.getipfsconfig);

    apiRoutes.use('/ipfsusage', ipfsusageRoutes);
    ipfsusageRoutes.post('/getusage',  IpfsusageController.getusage);
    ipfsusageRoutes.post('/createfile',  IpfsusageController.createfile);
    ipfsusageRoutes.post('/deletefile',  IpfsusageController.deletefile);
    ipfsusageRoutes.post('/listfiles',  IpfsusageController.listfiles);


    apiRoutes.use('/booking', bookingRoutes);
    bookingRoutes.get('/getBookings',  BookingController.getBookings);
    bookingRoutes.post('/getRookBooking',  BookingController.getRoomBookings);
    bookingRoutes.post('/createBooking',  BookingController.createBooking);
    bookingRoutes.get('/delete/:booking_id', requireAuth, AuthenticationController.roleAuthorization(['editor']), BookingController.deleteBooking);

    bookingRoutes.get('/getBooking/:booking_id',  BookingController.getBooking);

    apiRoutes.use('/post', postRoutes);
    postRoutes.get('/getposts',  PostController.getPosts);
    postRoutes.get('/getComments/:post_id',  PostController.getComments);
    postRoutes.post('/createPost',  PostController.createPost);
    postRoutes.post('/createComment',  PostController.createComment);
    app.use('/api', apiRoutes);

}
