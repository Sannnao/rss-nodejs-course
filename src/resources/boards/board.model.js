const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: String,
  columns: Array,
});

boardSchema.statics.toResponce = ({ _id: id, title, columns }) => ({
  id,
  title,
  columns,
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
