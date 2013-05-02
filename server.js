

//require('./server/js/main');

var connect = require('connect');


/**
 *  Define the sample application.
 */
var SampleApp = function() {

    //  Scope.
    var self = this;


    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_INTERNAL_IP;
        self.port      = process.env.OPENSHIFT_INTERNAL_PORT || 8080;

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_INTERNAL_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        };
    };

	

	//Initialize the server
	self.init = function(){
		
		self.app = connect();
	
		// Display incoming requests, coloured for status
		self.app.use(connect.logger('dev'));

		// Serve everything in the client subdir statically
		self.app.use(connect.static('client'));
		
		// This lets us return and log 404's, which is
		// very useful for debugging configuration problems
		self.app.use(function(err, req, res, next){});
		
		// The tcp port to listen on
		//self.app.listen(port,ipaddress);

		//console.log('MabbuQuest client server started on port '+port);
	}
	
	
    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: MabbuQuest Client started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });
    };

};   /*  Sample Application.  */



/**
 *  main():  Main code.
 */
var zapp = new SampleApp();
zapp.setupVariables();
zapp.init();
zapp.start();

