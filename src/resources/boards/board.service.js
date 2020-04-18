const {
  getBoardsFromDB,
  getBoardFromDB,
  saveBoardToDB,
  updateBoardToDB,
  removeBoardFromDB,
} = require('./board.memory.repository');
const { removeBoardTasks } = require('../tasks/task.service');
const Board = require('./board.model');

const getAllBoards = () => getBoardsFromDB();

const addBoard = (boardData) => saveBoardToDB(boardData);

const getBoard = (boardId) => getBoardFromDB(boardId);

const updateBoard = (boardId, boardData) => updateBoardToDB(boardId, boardData);

const deleteBoard = async (boardId) => {
  await removeBoardTasks(boardId);
  await removeBoardFromDB(boardId);
};

module.exports = {
  getAllBoards,
  addBoard,
  getBoard,
  updateBoard,
  deleteBoard,
};
