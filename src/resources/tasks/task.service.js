const Task = require('./task.model');
const {
  getTasksFromDB,
  saveTaskToDB,
  updateTaskToDB,
  removeTaskFromDB,
  unassignTasksFromDB,
  removeBoardTasksFromDB,
} = require('./task.memory.repository');

const getTasks = async (boardId) => {
  const tasks = await getTasksFromDB();
  const tasksByBoard = tasks.filter((task) => task.boardId === boardId);

  return tasksByBoard;
};

const addTask = async (boardId, taskData) => {
  const newTask = new Task({ ...taskData, boardId });

  await saveTaskToDB(newTask);
  return newTask;
};

const getTask = async (boardId, taskId) => {
  const tasks = await getTasks(boardId);

  if (!tasks.length) {
    return undefined;
  }

  const receivedTask = tasks.find((task) => task.id === taskId);

  return receivedTask;
};

const updateTask = async (boardId, taskId, taskData) => {
  const task = await getTask(boardId, taskId);

  if (task === undefined) {
    return undefined;
  }

  const updatedTask = Object.assign({}, task, taskData);

  await updateTaskToDB(updatedTask);

  return updatedTask;
};

const deleteTask = async (boardId, taskId) => {
  const task = await getTask(boardId, taskId);

  if (task === undefined) {
    return undefined;
  }

  return removeTaskFromDB(taskId);
};

const unassignUser = async (userId) => {
  await unassignTasksFromDB(userId);
};

const removeBoardTasks = async (boardId) => {
  await removeBoardTasksFromDB(boardId);
};

module.exports = {
  getTasks,
  addTask,
  getTask,
  updateTask,
  deleteTask,
  unassignUser,
  removeBoardTasks,
};
