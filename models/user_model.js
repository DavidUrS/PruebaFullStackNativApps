const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

var usersSchema = new Schema({
  _id: Schema.Types.ObjectId,
  user : String,
  password : String
})


var usersModel = mongoose.model('Users', usersSchema);

module.exports = usersModel;