'use strict';

var options        = require('../config/config');
var AfricasTalking = require('africastalking')(options.AT);
/* Set up mongoose */
var mongoose = require('mongoose');
require('./../models/Voices');
var Voice = mongoose.model('Voice');

exports.voiceMenus = function(req, res) {
  var isActive  = req.body.isActive;
  var callerNumber = req.body.callerNumber
  var dtmfDigits = req.body.dtmfDigits
  var sessionId = req.body.sessionId

  if (isActive === '1') {

    console.log(req.body);

	 switch (dtmfDigits) {
	  case "0":
	    //Talk to Sales. Compose the response
	          var response  = '<?xml version="1.0" encoding="UTF-8"?>'
	          response += '<Response>'
	          response += '<Say>Please hold while we connect you to Sales.</Say>';
	          response += '<Dial sequential="false" phoneNumbers="+254787235065,880.welovenerds@ke.sip.africastalking.com" ringbackTone="http://62.12.117.25:8010/media/SautiFinaleMoney.mp3"/>'
	          response += '</Response>';

		  res.setHeader('Content-Type', 'text/plain');
		  res.send( response );
	    break;

	  case "1":
	     //talk to support
	          var response  = '<?xml version="1.0" encoding="UTF-8"?>'
	          response += '<Response>'
	          response += '<Say>Please hold while we connect you to Support.</Say>';
	          response += '<Dial phoneNumbers="+254787235065" ringbackTone="http://62.12.117.25:8010/media/SautiFinaleMoney.mp3"/>'
	          response += '</Response>';

		  res.setHeader('Content-Type', 'text/plain');
		  res.send( response )
	    break;

	  case "2":
	      //redirect to main IVR
	          var response  = '<?xml version="1.0" encoding="UTF-8"?>'
	          response += '<Response>'
	          response += '<Redirect>http://62.12.117.25:8010/voice</Redirect>'
	          response += '</Response>';

		  res.setHeader('Content-Type', 'text/plain');
		  res.send( response );
	    break;

	  default:
	     //talk to support
	          var response  = '<?xml version="1.0" encoding="UTF-8"?>'
	          response += '<Response>'
	          response += '<Say>Please hold while we connect you to Support.</Say>';
	          response += '<Dial phoneNumbers="+254787235065" ringbackTone="http://62.12.117.25:8010/media/SautiFinaleMoney.mp3"/>'
	          response += '</Response>';

		  res.setHeader('Content-Type', 'text/plain');
		  res.send( response )
	    break;
	  }


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
