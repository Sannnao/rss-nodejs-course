const {
  getBoardsFromDB,
  saveBoardToDB,
  updateBoardToDB,
  removeBoardFromDB,
} = require('./board.memory.repository');
const { removeBoardTasks } = require('../tasks/task.service');
const Board = require('./board.model');

const getAllBoards = async () => {
  const boards = await getBoardsFromDB();

  return boards;
};

const addBoard = async (boardData) => {
  const newBoard = new Board(boardData);

  await saveBoardToDB(newBoard);
  return newBoard;
};

const getBoard = async (boardId) => {
  const boards = await getAllBoards();
  const board = boards.find(({ id }) => id === boardId);

  return board;
};

const updateBoard = async (boardId, boardData) => {
  const board = await getBoard(boardId);

  if (board === undefined) {
    return undefined;
  }

  const updatedBoard = Object.assign({}, board, boardData);

  await updateBoardToDB(updatedBoard);

  return updatedBoard;
};

const deleteBoard = async (boardId) => {
  const board = await getBoard(boardId);

  if (board === undefined) {
    return undefined;
  }

  await removeBoardTasks(boardId);
  return removeBoardFromDB(boardId);
};

module.exports = {
  getAllBoards,
  addBoard,
  getBoard,
  updateBoard,
  deleteBoard,
};
