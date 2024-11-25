const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const checkid_schema = new Schema({
  idPost:{type:mongoose.Schema.Types.ObjectId,require:true}

});


const checkid = mongoose.model('checkid', checkid_schema);

module.exports = checkid;