var restify = require('restify');
var server = restify.createServer();
server.use(restify.bodyParser());
const port = 8088;

var books = require('./routes/books');
var users = require('./routes/users');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/library');
var db = mongoose.connection;

db.on('error', function(msg){
	console.log('Mongoose connection error %s', msg);
});

db.once('open', function(){
	console.log('Mongoose connection established');
});

server.post('books/add', books.create);
server.post('books/:isbn', books.read);
server.get(/\/client\/?.*/, restify.serveStatic({
	directory: __dirname, 
	default: "index.html"
}));

//add or find users users
server.post('users/add', users.create);
server.get('users/:lastName', users.byLastName)
server.get('users', users.all)

server.listen(port, function(){
	console.log("%s listening on %s", server.name, port);
});