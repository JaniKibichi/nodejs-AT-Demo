'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
  name: String,
  phoneNumber: {type:String, unique: true },
  created: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Client', ClientSchema);
