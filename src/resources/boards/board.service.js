const {
  getAllResources,
  addResource,
  getResource,
  updateResource,
  deleteResource,
} = require('../router-constructor/service');
const Board = require('./board.model');

const getAllBoards = async (pathToDb) => {
  const boards = await getAllResources(pathToDb);

  return boards;
};

const addBoard = async (boardData, pathToDb) => {
  const newBoard = await addResource(boardData, Board, pathToDb);

  return newBoard;
};

const getBoard = async (boardId, pathToDb) => {
  const board = await getResource(boardId, pathToDb);

  return board;
};

const updateBoard = async (boardId, boardData, pathToDb) => {
  const updatedBoard = await updateResource(boardId, boardData, pathToDb);

  return updatedBoard;
};

const deleteBoard = async (boardId, pathToDb) => {
  await deleteResource(boardId, pathToDb);
};

module.exports = {
  getAllBoards,
  addBoard,
  getBoard,
  updateBoard,
  deleteBoard,
};
