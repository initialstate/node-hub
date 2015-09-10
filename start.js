
var buckets = require('./buckets');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// read the body of any content type as utf-8 text
app.use(bodyParser.text({ type: '*/*' }));

// A simple response from the hub
app.get('/', function (req, res) {

	res.send('Hello.');

});

// Relay event data, securely, to Initial State
app.post('/:bucket/:event', function (req, res) {

	if (typeof req.body === 'undefined') {
		// there's no value
		return res.sendStatus(400);
	}

	// send an event to Initial State
	buckets.get(req.params.bucket).push(req.params.event, req.body || '');

	// send back a successful response (HTTP 204 = It worked, that is all.)
	res.status(204).end();
    console.log(req.params.event, req.body);
});

app.listen(80, function () {

	console.log('Node-hub serving on port', this.address().port);

});
