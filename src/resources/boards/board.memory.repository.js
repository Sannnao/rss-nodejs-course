const Board = require('./board.model');

const getBoardsFromDB = async () => {
  try {
    const boards = await Board.find();

    return boards.map((board) => Board.toResponce(board));
  } catch (err) {
    throw new Error(err);
  }
};

const saveBoardToDB = async (boardData) => {
  try {
    const board = await Board.create(boardData);
    return Board.toResponce(board);
  } catch (err) {
    throw new Error(err);
  }
};

const getBoardFromDB = async (boardId) => {
  try {
    const board = await Board.findById(boardId);

    return Board.toResponce(board);
  } catch (err) {
    throw {
      status: 404,
      message: `Board with id ${boardId} doesn't exist!`,
      err,
    };
  }
};

const updateBoardToDB = async (boardId, boardData) => {
  try {
    const board = await Board.findByIdAndUpdate(boardId, boardData, {
      new: true,
    });

    return Board.toResponce(board);
  } catch (err) {
    throw {
      status: 404,
      message: `Board with id ${boardId} doesn't exist!`,
      err,
    };
  }
};

const removeBoardFromDB = async (boardId) => {
  try {
    await Board.findByIdAndDelete(boardId);
  } catch (err) {
    throw {
      status: 404,
      message: `Board with id ${boardId} doesn't exist!`,
      err,
    };
  }
};

module.exports = {
  getBoardsFromDB,
  getBoardFromDB,
  saveBoardToDB,
  updateBoardToDB,
  removeBoardFromDB,
};
