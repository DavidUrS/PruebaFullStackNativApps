const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var studentsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  identificacion : String,
  nombres : String,
  apellidos: String,
  genero: String,
  curso:{
    type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses'
  }
})

var studentsModel = mongoose.model('Students', studentsSchema);

module.exports = studentsModel;