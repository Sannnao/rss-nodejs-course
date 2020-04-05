const {
  getAllResourcesFromDB,
  saveResourcesToDB,
  createResource,
  getResourceIndex,
  findResource,
} = require('../router-constructor/utils/resource-utils');
const {
  getBoardsFromDB,
  saveBoardToDB,
  updateBoardToDB,
  removeBoardFromDB,
} = require('./board.memory.repository');
const Board = require('./board.model');

const getAllBoards = () => {
  // const boards = await getAllResourcesFromDB(pathToDb);
  const boards = getBoardsFromDB();

  return boards;
};

const addBoard = (boardData) => {
  const newBoard = new Board(boardData);

  saveBoardToDB(newBoard);
  return newBoard;
};

const getBoard = (boardId) => {
  const boards = getAllBoards();
  const board = findResource(boards, boardId);

  return board;
};

const updateBoard = (boardId, boardData) => {
  const board = getBoard(boardId);

  if (board === undefined) {
    return undefined;
  }

  const boards = getAllBoards();
  const updatedBoard = { id: boardId, ...boardData };
  const boardIndex = getResourceIndex(boards, boardId);

  updateBoardToDB(updatedBoard, boardIndex);

  return updatedBoard;
};

const deleteBoard = async (boardId) => {
  const board = getBoard(boardId);

  if (board === undefined) {
    return undefined;
  }

  const boards = getAllBoards();
  const boardIndex = getResourceIndex(boards, boardId);

  removeBoardFromDB(boardIndex);
};

module.exports = {
  getAllBoards,
  addBoard,
  getBoard,
  updateBoard,
  deleteBoard,
};
