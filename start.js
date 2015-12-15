'use strict';

var buckets = require('./buckets');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var port = process.env.IS_HUB_PORT || 80;
var argv = process.argv.slice(process.argv.indexOf(__filename) + 1);

if (isFinite(+argv[0])) {
	// consume argument as port number 
	port = +argv.shift();
}
if (argv[0]) {
	// Use access key from command line arguments
	buckets.setAccessKey(argv[0]);
}

// read the body of any content type as utf-8 text
app.use(bodyParser.text({ type: function () { return true; } }));

// Relay event data, securely, to Initial State
app.post('/:bucket/:event', function (req, res) {

	if (typeof req.body === 'undefined') {
		// there's no value
		return res.sendStatus(400);
	}

	// If the request includes a "Date" header, use it
	var date = new Date(req.get('date'));
	if (isNaN(+date)) {
		// ...but only if it's a valid date
		date = void 0;
	}

	// send an event to Initial State
	buckets.get(req.params.bucket).push(req.params.event, req.body || '', date);

	// send back a successful response (HTTP 204 = It worked, that is all.)
	res.status(204).end();

});

// Show README.md as a homepage
app.engine('md', require('./md-view'));
app.set('views', __dirname);
app.set('view engine', 'md');
app.disable('x-powered-by');
app.get('/', function (req, res, next) {
	res.render('README');
});

app.listen(port, function () {

	console.log('Node-hub serving on port', this.address().port);

});
