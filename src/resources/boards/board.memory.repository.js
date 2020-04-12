// const fs = require('fs');
// const path = require('path');
// const util = require('util');

// const readFile = util.promisify(fs.readFile);
// const writeFile = util.promisify(fs.writeFile);
// const pathToBoardDB = path.join(__dirname, '../../temp-db/', 'boards.json');

const boardsState = [];

const getBoardsFromDB = async () => {
  // const boards = await readFile(pathToBoardDB, 'utf-8');
  // return JSON.parse(boards);
  return [...boardsState];
};

const saveBoardsToDB = async (boards) => {
  // await writeFile(pathToBoardDB, JSON.stringify(boards));
  // console.log('Boards saved!');
  boardsState.splice(0, boardsState.length, ...boards);
};

const saveBoardToDB = async (newBoard) => {
  const boards = await getBoardsFromDB();
  boards.push(newBoard);
  await saveBoardsToDB(boards);
};

const getBoardFromDB = async (boardId) => {
  try {
    const boards = await getBoardsFromDB();
    const board = boards.find(({ id }) => id === boardId);

    if (board === undefined) {
      throw {
        status: 404,
        message: `Board with id ${boardId} doesn't exist!`,
      };
    }

    return board;
  } catch ({ status, message }) {
    throw {
      status,
      message: `Can't get a board because: ${message}`,
    };
  }
};

const updateBoardToDB = async (boardId, boardData) => {
  try {
    const boards = await getBoardsFromDB();
    const boardIndex = boards.findIndex(({ id }) => id === boardId);

    if (boardIndex === -1) {
      throw {
        status: 404,
        message: `Board with id ${boardId} doesn't exist!`,
      };
    }
    const board = boards[boardIndex];
    const updatedBoard = Object.assign({}, board, boardData);
    boards.splice(boardIndex, 1, updatedBoard);
    await saveBoardsToDB(boards);
    return updatedBoard;
  } catch ({ status, message }) {
    throw {
      status,
      message: `Can't update a board because: ${message}`,
    };
  }
};

const removeBoardFromDB = async (boardId) => {
  try {
    const boards = await getBoardsFromDB();
    const boardIndex = boards.findIndex(({ id }) => id === boardId);

    if (boardIndex === -1) {
      throw {
        status: 404,
        message: `Board with id ${boardId} doesn't exist!`,
      };
    }

    boards.splice(boardIndex, 1);
    await saveBoardsToDB(boards);
  } catch ({ status, message }) {
    throw {
      status,
      message: `Can't delete a board because: ${message}`,
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
