'use strict';
/* Set up mongoose */
var mongoose = require('mongoose');
require('./../models/Dlrs');
var Dlr = mongoose.model('Dlr');

exports.dlr = function(req, res) {
      //Store the Dlr
      var dlr = new Dlr();
		dlr.messageId = req.body.id;
		dlr.status = req.body.status;
      //save the dlr
      dlr.save().then(function(dlr){
        res.json({ message: 'dlr is stored'});
        console.log(dlr);
      })
      .catch(function(error){
        console.log({ message: 'error creating sms...', error});
      });   	

	console.log(messageId, status);
	res.send(200);
};
