const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const comment_schema = new Schema({
  name:{type:String,require:true},
  content:{type:String,require:true},
  idPost:{type:mongoose.Schema.Types.ObjectId,require:true}

});


const comment = mongoose.model('comment', comment_schema);

module.exports = comment;