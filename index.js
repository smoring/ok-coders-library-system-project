var restify = require('restify');
var server = restify.createServer();
server.use(restify.bodyParser());
const port = 8088;

var auth = require('./routes/books');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/library');
var db = mongoose.connection;

db.on('error', function(msg){
	console.log('Mongoose connection error %s', msg);
});

db.once('open', function(){
	console.log('Mongoose connection established');
});

server.post('/book/add', books.create);
server.post('/book/:isbn', books.read);
server.get('/', restify.serveStatic({
	directory: './client', 
	default: "index.html"
}));

server.listen(port, function(){
	console.log("%s listening on %s", server.name, port);
});