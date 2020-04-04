const resourcesRepo = require('../router-constructor/repository');
const { getAllResources } = require('../router-constructor/service');
const {
  createResource,
} = require('../router-constructor/utils/resource-utils');
const Task = require('./task.model');

const getTasks = async (boardId, pathToDB) => {
  const boards = await getAllResources(pathToDB);
  const tasks = boards.find(({ id }) => id === boardId).columns;

  return tasks;
};

const addTask = async (boardId, taskData, pathToDb) => {
  const boards = await getAllResources(pathToDb);
  const boardIndex = boards.findIndex(({ id }) => id === boardId);
  const newTask = createResource(taskData, Task);
  boards[boardIndex].columns.push(newTask);
  boards[boardIndex].columns.sort((a, b) => a.order - b.order);

  resourcesRepo.saveAllResources(JSON.stringify(boards), pathToDb);

  return newTask;
};

const getTask = async (boardId, taskId, pathToDb) => {
  const boards = await getAllResources(pathToDb);
  const boardIndex = boards.findIndex(({ id }) => id === boardId);

  return boards[boardIndex].columns.find(({ id }) => id === taskId);
};

const updateTask = async (boardId, taskId, taskData, pathToDb) => {
  const boards = await getAllResources(pathToDb);
  const boardIndex = boards.findIndex(({ id }) => id === boardId);
  const taskIndex = boards[boardIndex].columns.findIndex(
    ({ id }) => id === taskId,
  );
  const updatedTask = { id: taskId, ...taskData };
  boards[boardIndex].columns[taskIndex] = updatedTask;
  boards[boardIndex].columns.sort((a, b) => a.order - b.order);

  resourcesRepo.saveAllResources(JSON.stringify(boards), pathToDb);

  return updatedTask;
};

const deleteTask = async (boardId, taskId, pathToDb) => {
  const boards = await getAllResources(pathToDb);
  const boardIndex = boards.findIndex(({ id }) => id === boardId);
  const taskIndex = boards[boardIndex].columns.findIndex(
    ({ id }) => id === taskId,
  );
  boards[boardIndex].columns.splice(taskIndex, 1);

  resourcesRepo.saveAllResources(JSON.stringify(boards), pathToDb);
};

module.exports = {
  getTasks,
  addTask,
  getTask,
  updateTask,
  deleteTask,
};
