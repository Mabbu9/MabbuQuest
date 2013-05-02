//require('./server/js/main');

var connect = require('connect');
var app = connect();

var ipaddress = process.env.OPENSHIFT_INTERNAL_IP;
var port      = process.env.OPENSHIFT_INTERNAL_PORT || 8080;

        if (typeof ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_INTERNAL_IP var, using 127.0.0.1');
            ipaddress = "127.0.0.1";
		}

// Display incoming requests, coloured for status
app.use(connect.logger('dev'));

// Serve everything in the client subdir statically
app.use(connect.static('client'));

// This lets us return and log 404's, which is
// very useful for debugging configuration problems
app.use(function(err, req, res, next){});

// The tcp port to listen on
app.listen(port,ipaddress);

console.log('MabbuQuest client server started on port '+port);