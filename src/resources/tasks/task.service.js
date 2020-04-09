const Task = require('./task.model');
const {
  getBoardTasksFromDB,
  getTaskFromDB,
  saveTaskToDB,
  updateTaskToDB,
  removeTaskFromDB,
  unassignTasksFromDB,
  removeBoardTasksFromDB,
} = require('./task.memory.repository');

const getTasks = async (boardId) => {
  const boardTasks = await getBoardTasksFromDB(boardId);

  return boardTasks;
};

const saveTask = async (boardId, taskData) => {
  const newTask = new Task({ ...taskData, boardId });
  await saveTaskToDB(newTask);
  return newTask;
};

const getTask = (boardId, taskId) => {
  return getTaskFromDB(boardId, taskId);
};

const updateTask = (boardId, taskId, taskData) => {
  return updateTaskToDB(boardId, taskId, taskData);
};

const deleteTask = async (boardId, taskId) => {
  await removeTaskFromDB(boardId, taskId);
};

const unassignUser = (userId) => {
  unassignTasksFromDB(userId);
};

const removeBoardTasks = async (boardId) => {
  await removeBoardTasksFromDB(boardId);
};

module.exports = {
  getTasks,
  saveTask,
  getTask,
  updateTask,
  deleteTask,
  unassignUser,
  removeBoardTasks,
};
