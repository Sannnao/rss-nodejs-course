const boardsState = [];

const getBoardsFromDB = () => {
  return [...boardsState];
};

const saveBoardToDB = (board) => {
  boardsState.push(board);
};

const updateBoardToDB = (board, boardIndex) => {
  boardsState.splice(boardIndex, 1, board);
};

const removeBoardFromDB = (boardIndex) => {
  boardsState.splice(boardIndex, 1);
};

module.exports = {
  getBoardsFromDB,
  saveBoardToDB,
  updateBoardToDB,
  removeBoardFromDB,
};
