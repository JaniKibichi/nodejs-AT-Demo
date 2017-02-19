'use strict';

var options        = require('../config/config');
var AfricasTalking = require('africastalking')(options.AT);
/* Set up mongoose */
var mongoose = require('mongoose');
require('./../models/Voices');
var Voice = mongoose.model('Voice');

exports.voice = function(req, res) {
  var isActive  = req.body.isActive;

  if (isActive === '1') {

    console.log(req.body);

      var response = '<Response>';
      response += '<GetDigits timeout="30" finishOnKey="#" callbackUrl="http://62.12.117.25:8010/voiceMenus">';
      response += '<Say>Thank you for calling Biz Africa. Press 0 followed by the hash sign to talk to sales, 1 followed by the hash sign to talk to support or 2 followed by the hash sign to hear this message again.</Say>';
      response += '</GetDigits>';
      response += '<Say>Thank you for calling. Good bye!</Say>';
      response += '</Response>';

	  res.setHeader('Content-Type', 'text/plain');
	  res.send( response );
  } else {
    
    //isActive is '0'. Save the ended call
      var voice = new Voice();
        voice.durationInSeconds= req.body.durationInSeconds,
        voice.direction= req.body.direction,
        voice.amount= req.body.amount,
        voice.callerNumber= req.body.callerNumber,
        voice.destinationNumber= req.body.destinationNumber,
        voice.sessionId= req.body.sessionId,
        voice.callStartTime= req.body.callStartTime,
        voice.isActive= req.body.isActive,
        voice.currencyCode= req.body.currencyCode,
        voice.status= req.body.status
      //save the voice
      voice.save().then(function(voice){
        res.json({ message: 'voice is stored'});
        console.log(voice);
      })
      .catch(function(error){
        console.log({ message: 'error creating voice...', error});
      }); 

  }
};
