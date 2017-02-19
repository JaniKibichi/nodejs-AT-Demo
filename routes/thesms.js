'use strict';

//instantiate variables
var options = require('../config/config');
var Africastalking = require('africastalking')(options.AT)
var voice   = Africastalking.VOICE;
var sms = Africastalking.SMS;

/* Set up mongoose */
var mongoose = require('mongoose');
require('./../models/SMSs');
var SMS = mongoose.model('SMS');

var textMessage = "Thank you for contacting Africastalking. ";
textMessage += "We will call you shortly. ";
textMessage += "Our customer care number is +254711082799.";

exports.wiredSMS = function(req, res) {
    var isReceived = req.body.from;

    if(typeof isReceived !== "undefined" && isReceived !== null){
     console.log(req.body);

     	//create a message alerting the user of the call center number
    	var opts = { 'to': isReceived, 'message': textMessage };

      sms.send(opts)
      .then(function(s) { 
      	console.log(s); 
      })
      .catch(function (error) {
        console.log(error);
      });

  	//Dial out to the user
      voice.call({
        'callFrom': '+254711082799',
        'callTo': isReceived
      })
      .then(function(s) {
        console.log(s);
      })
      .catch(function(error) {
        console.log(error);
      });

      //Store the SMS callback
      var sms = new SMS();
        sms.from= req.body.from;
        sms.to= req.body.to;
        sms.text= req.body.text;
        sms.date= req.body.date;
        sms.smsid= req.body.id;
        sms.linkid= req.body.linkId;
      //save the sms
      sms.save().then(function(sms){
        res.json({ message: 'SMS is stored'});
        console.log(sms);
      })
      .catch(function(error){
        console.log({ message: 'error creating sms...', error});
      });        

    }else{
      console.log('Problems', isReceived);
    }

    //Alert the gateway that the POST is received.
    res.status(200);
    res.send();

};
