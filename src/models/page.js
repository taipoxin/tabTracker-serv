// @flow

const mongoose = require('mongoose');

const { Schema } = mongoose;

/*
  notice there is no ID. That's because Mongoose will assign
  an ID by default to all schemas
*/

const PageSchema = new Schema({
  user: Number,
  title: String,
  datetime: Number,
});

module.exports = mongoose.model('Page', PageSchema);
