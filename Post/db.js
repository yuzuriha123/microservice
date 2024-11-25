const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const post_schema = new Schema({
  title:{type:String,require:true},
  content:{type:String,require:true},
});
const post = mongoose.model('post', post_schema);

module.exports = post;