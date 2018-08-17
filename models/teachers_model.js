const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var teachersSchema = new Schema({
  _id: Schema.Types.ObjectId,
  identidad : String,
  nombres : String,
  apellidos: String,
  genero: String,
  curso:{
    type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses'
  }
})

var teachersModel = mongoose.model('Teachers', teachersSchema);

module.exports = teachersModel;