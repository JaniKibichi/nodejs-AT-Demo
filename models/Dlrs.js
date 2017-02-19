'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DlrSchema = new Schema({
  status: String,
  messageId: {type:String, unique: true },
  created: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Dlr', DlrSchema);