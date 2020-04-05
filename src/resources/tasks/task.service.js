const Task = require('./task.model');
const {
  getTasksFromDB,
  saveTaskToDB,
  updateTaskToDB,
  removeTaskFromDB,
  unassignTasksFromDB,
} = require('./task.memory.repository');

const getTasks = async (boardId) => {
  const tasks = await getTasksFromDB();
  const tasksByBoard = await tasks.filter((task) => task.boardId === boardId);

  return tasksByBoard;
};

const addTask = async (boardId, taskData) => {
  const tasks = await getTasksFromDB();
  const newTask = new Task({ ...taskData, boardId });
  tasks.push(newTask);
  tasks.sort((a, b) => a.order - b.order);
  const taskIndex = tasks.findIndex(({ order }) => order === newTask.order);

  await saveTaskToDB(newTask, taskIndex);
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

  const tasks = await getTasksFromDB();
  const updatedTask = Object.assign({}, task, taskData);
  let taskIndex = tasks.findIndex(({ id }) => id === taskId);
  tasks[taskIndex] = updatedTask;
  tasks.sort((a, b) => a.order - b.order);
  taskIndex = tasks.findIndex(({ id }) => id === taskId);

  await updateTaskToDB(updatedTask, taskIndex);

  return updatedTask;
};

const deleteTask = async (boardId, taskId) => {
  const task = await getTask(boardId, taskId);

  if (task === undefined) {
    return undefined;
  }

  const tasks = await getTasksFromDB();
  const taskIndex = tasks.findIndex(({ id }) => id === taskId);

  await removeTaskFromDB(taskIndex);
};

const unassignUser = async (userId) => {
  await unassignTasksFromDB(userId);
};

module.exports = {
  getTasks,
  addTask,
  getTask,
  updateTask,
  deleteTask,
  unassignUser,
};
