require('./server/js/main');

var connect = require('connect');
var app = connect();
var port = 80;

// Display incoming requests, coloured for status
app.use(connect.logger('dev'));

// Serve everything in the client subdir statically
app.use(connect.static('client'));

// This lets us return and log 404's, which is
// very useful for debugging configuration problems
app.use(function(err, req, res, next){});

// The tcp port to listen on
app.listen(port);

console.log('MabbuQuest client server started on port '+port);