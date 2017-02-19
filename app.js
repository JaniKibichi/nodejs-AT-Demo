'use strict';

var express    = require('express');

var app        = express();
var bodyParser = require('body-parser');
var index      = require('./routes/index');
var voice      = require('./routes/voice');
var voiceMenus = require('./routes/voiceMenus')
var ussd       = require('./routes/ussd');
var dlr        = require('./routes/dlrs');
var thesms     = require('./routes/thesms');
var fs         = require('fs');
var logger     = require('morgan');
var path = require('path');

/* Set up DB */
var mongoose = require('mongoose');
/* configure mongoose */
mongoose.connect('mongodb://localhost:27017/19thfeb2017');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// create a write stream (in append mode) 
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(logger('combined', { stream: accessLogStream, skip: function (req, res) { return res.statusCode < 400; } }));
app.use(logger('dev'));

var port = process.env.PORT || 8010;
// routes
app.get('/', index.index);
app.post('/ussd', ussd.wiredUssd);
app.post('/dlr', dlr.dlr);
app.post('/voice', voice.voice);
app.post('/voiceMenus', voiceMenus.voiceMenus);
app.post('/thesms', thesms.wiredSMS);

app.listen(port, function() {
    console.log('Magic happens on port ' +port);
});
