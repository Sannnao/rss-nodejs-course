const Task = require('./task.model');
const {
  getTasksFromDB,
  saveTaskToDB,
  updateTaskToDB,
  removeTaskFromDB,
  unassignTasksFromDB,
  removeBoardTasksFromDB,
} = require('./task.memory.repository');

const getTasks = (boardId) => {
  const tasks = getTasksFromDB();
  const tasksByBoard = tasks.filter((task) => task.boardId === boardId);

  return tasksByBoard;
};

const addTask = (boardId, taskData) => {
  const tasks = getTasksFromDB();
  const newTask = new Task({ ...taskData, boardId });
  tasks.push(newTask);
  tasks.sort((a, b) => a.order - b.order);
  const taskIndex = tasks.findIndex(({ order }) => order === newTask.order);

  saveTaskToDB(newTask, taskIndex);
  return newTask;
};

const getTask = (boardId, taskId) => {
  const tasks = getTasks(boardId);

  if (!tasks.length) {
    return undefined;
  }

  const receivedTask = tasks.find((task) => task.id === taskId);

  return receivedTask;
};

const updateTask = (boardId, taskId, taskData) => {
  const task = getTask(boardId, taskId);

  if (task === undefined) {
    return undefined;
  }

  const tasks = getTasksFromDB();
  const updatedTask = Object.assign({}, task, taskData);
  let taskIndex = tasks.findIndex(({ id }) => id === taskId);
  tasks[taskIndex] = updatedTask;
  tasks.sort((a, b) => a.order - b.order);
  taskIndex = tasks.findIndex(({ id }) => id === taskId);

  updateTaskToDB(updatedTask, taskIndex);

  return updatedTask;
};

const deleteTask = (boardId, taskId) => {
  const task = getTask(boardId, taskId);

  if (task === undefined) {
    return undefined;
  }

  const tasks = getTasksFromDB();
  const taskIndex = tasks.findIndex(({ id }) => id === taskId);

  return removeTaskFromDB(taskIndex);
};

const unassignUser = (userId) => {
  unassignTasksFromDB(userId);
};

const removeBoardTasks = (boardId) => {
  removeBoardTasksFromDB(boardId);
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
