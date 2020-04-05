const getTaskIndex = (board, taskId) => {
  return board.columns.findIndex(({ id }) => id === taskId);
};

const findBoard = (boards, boardId) => {
  return boards.find(({ id }) => id === boardId);
};

const findTask = (board, taskId) => {
  return board.columns.find(({ id }) => id === taskId);
};

module.exports = {
  getTaskIndex,
  findBoard,
  findTask,
};
