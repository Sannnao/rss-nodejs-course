const boardsState = [];

const getBoardsFromDB = () => {
  return [...boardsState];
};

const saveBoardToDB = (board) => {
  boardsState.push(board);
};

const updateBoardToDB = (board) => {
  const boardIndex = boardsState.findIndex(({ id }) => id === board.id);
  boardsState.splice(boardIndex, 1, board);
};

const removeBoardFromDB = (boardId) => {
  const boardIndex = boardsState.findIndex(({ id }) => id === boardId);
  boardsState.splice(boardIndex, 1);
  return 'Board successfully deleted!';
};

module.exports = {
  getBoardsFromDB,
  saveBoardToDB,
  updateBoardToDB,
  removeBoardFromDB,
};
