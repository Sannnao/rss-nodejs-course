const {
  getTasksFromDB,
  getTaskFromDB,
  saveTaskToDB,
  updateTaskToDB,
  removeTaskFromDB,
  unassignTasksFromDB,
  removeBoardTasksFromDB,
} = require('./task.memory.repository');

const getTasks = (boardId) => getTasksFromDB(boardId);

const saveTask = (boardId, taskData) => saveTaskToDB(boardId, taskData);

const getTask = (boardId, taskId) => getTaskFromDB(boardId, taskId);

const updateTask = (boardId, taskId, taskData) =>
  updateTaskToDB(boardId, taskId, taskData);

const deleteTask = (boardId, taskId) => removeTaskFromDB(boardId, taskId);

const unassignUser = (userId) => unassignTasksFromDB(userId);

const removeBoardTasks = (boardId) => removeBoardTasksFromDB(boardId);

module.exports = {
  getTasks,
  saveTask,
  getTask,
  updateTask,
  deleteTask,
  unassignUser,
  removeBoardTasks,
};
