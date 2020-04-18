const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  order: Number,
  description: String,
  userId: String,
  boardId: String,
  columnId: String,
});

taskSchema.statics.toResponce = ({
  _id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}) => ({
  id: _id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
