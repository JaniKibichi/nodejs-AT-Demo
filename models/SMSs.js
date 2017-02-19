'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SMSSchema = new Schema({
  from: String,
  to: String,
  text: String,
  smsid: String,
  linkid: String,
  created: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('SMS', SMSSchema);
