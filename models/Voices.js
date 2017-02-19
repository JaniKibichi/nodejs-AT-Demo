'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VoiceSchema = new Schema({
  durationInSeconds: String,
  direction: String,
  amount: String,
  callerNumber: String,
  destinationNumber: String,
  sessionId: String,
  callStartTime: String,
  isActive: String,
  currencyCode: String,
  status: String,  
  created: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Voice', VoiceSchema);