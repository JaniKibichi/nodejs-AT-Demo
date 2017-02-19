'use strict';

var options = require('../config/config');
var AfricasTalking = require('africastalking')(options.AT);
var sms     = AfricasTalking.SMS;
var voice   = AfricasTalking.VOICE;
/* Set up mongoose */
var mongoose = require('mongoose');
require('./../models/Clients');
var Client = mongoose.model('Client');

var txt_message = "Thank you for contacting AfricasTalking. ";
txt_message += "We are happy to serve you. ";
txt_message += "Service number is +254711082799";


exports.wiredUssd = function(req, res) {
  var message = "";

  var sessionId   = req.body.sessionId;
  var serviceCode = req.body.serviceCode;
  var phoneNumber = req.body.phoneNumber;
  var text 	      = req.body.text;

  console.log(sessionId, serviceCode, phoneNumber, text);

  var length = text.split('*').length;
  var txt = text.split('*');

  if (text === '') {
	 message = 'CON Welcome to AfricasTalking\n';
	 message += 'Enter your name to for us to serve you better. \n';
  }

  // add a client
  else if (length === 1) {
    // check if user is agent
    message = 'END You have been registered, we will call you shortly';
    var opts = { 'to': phoneNumber, 'message': txt_message };

    sms.send(opts)
    .then(function(s) {
      console.log(s);
    })
    .catch(function (error) {
      console.log(error);
    });

    voice.call({
      'callFrom': '+254711082880',
      'callTo': phoneNumber
    })
    .then(function(s) {
      console.log(s);
    })
    .catch(function(error) {
      console.log(error);
    });

    var options = text.split('*');
    console.log('Array from ussd', options);

      //Store the Client
      var client = new Client();
        client.name= options[options.length-1];
        client.phoneNumber= phoneNumber;
      //save the client
      client.save().then(function(client){
        res.json({ message: 'client is stored'});
        console.log(client);
      })
      .catch(function(error){
        console.log({ message: 'error creating client...', error});
      });     

  }
  else {
	  message = 'END Wrong input';
  }

  res.contentType('text/plain');
  res.send(message, 200);
};
