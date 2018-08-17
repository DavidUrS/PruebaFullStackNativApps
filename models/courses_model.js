const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var coursesSchema = new Schema({
  _id: Schema.Types.ObjectId,
  codigo : String,
  nombre : String,
  observaciones: String
})

var coursesModel = mongoose.model('Courses', coursesSchema);

module.exports = coursesModel;