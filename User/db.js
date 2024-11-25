const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user_schema = new Schema({
 username:{type:String,require:true},
  password:{type:String,require:true},
  name:{type:String,require:true}
});
const user = mongoose.model('user', user_schema);

module.exports = user;