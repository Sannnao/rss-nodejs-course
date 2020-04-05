const { getAllBoards, getBoard } = require('../boards/board.service');
const {
  createResource,
  saveResources,
} = require('../router-constructor/utils/resource-utils');
const { getTaskIndex, findBoard, findTask } = require('./utils/task-utils');
const Task = require('./task.model');

const getTasks = async (boardId, pathToDB) => {
  const board = await getBoard(boardId, pathToDB);
  const tasks = board.columns;

  return tasks;
};

const addTask = async (boardId, taskData, pathToDb) => {
  const boards = await getAllBoards(pathToDb);
  const board = findBoard(boards, boardId);
  const newTask = createResource(taskData, Task);
  board.columns.push(newTask);
  board.columns.sort((a, b) => a.order - b.order);

  saveResources(boards, pathToDb);

  return newTask;
};

const getTask = async (boardId, taskId, pathToDb) => {
  const boards = await getAllBoards(pathToDb);
  const board = findBoard(boards, boardId);

  return findTask(board, taskId);
};

const updateTask = async (boardId, taskId, taskData, pathToDb) => {
  const boards = await getAllBoards(pathToDb);
  const board = findBoard(boards, boardId);
  const taskIndex = getTaskIndex(board);
  const updatedTask = { id: taskId, ...taskData };
  board.columns[taskIndex] = updatedTask;
  board.columns.sort((a, b) => a.order - b.order);

  saveResources(boards, pathToDb);

  return updatedTask;
};

const deleteTask = async (boardId, taskId, pathToDb) => {
  const boards = await getAllBoards(pathToDb);
  const board = findBoard(boards, boardId);
  const taskIndex = getTaskIndex(board);
  board.columns.splice(taskIndex, 1);

  saveResources(boards, pathToDb);
};

module.exports = {
  getTasks,
  addTask,
  getTask,
  updateTask,
  deleteTask,
};
