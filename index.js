var restify = require('restify');
var server = restify.createServer();
server.use(restify.bodyParser());
const port = 8088;

var books = require('./routes/books');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/library');
var db = mongoose.connection;

db.on('error', function(msg) {
	console.log('Mongoose connection error %s', msg);
});

db.once('open', function() {
	console.log('Mongoose connection established');
});

server.post('books/add', books.create);
server.get('books', books.read);
server.put('books/:id', books.delete);
//server.get('books/:searchData/:searchType', books.search)
server.get('/', restify.serveStatic({
	directory: './client', 
	default: 'index.html'
}));

server.listen(port, function() {
	console.log("%s listening on %s", server.name, port);
});