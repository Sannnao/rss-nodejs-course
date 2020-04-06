const router = require('express').Router();
const path = require('path');
const {
  getAllBoards,
  addBoard,
  getBoard,
  updateBoard,
  deleteBoard,
} = require('./board.service');
const { BOARDS } = require('../../constants/entities');
const boardsPath = path.resolve(__dirname, '../../temp-db/', `${BOARDS}.json`);

router.route('/').get((req, res) => {
  const boards = getAllBoards(boardsPath);

  res.set('content-type', 'application/json').status(200);
  return res.json(boards);
});

router.route('/').post((req, res) => {
  const newBoard = addBoard(req.body, boardsPath);

  res
    .set('content-type', 'application/json')
    .status(200)
    .json(newBoard);
});

router.route('/:boardId').get((req, res) => {
  const boardId = req.params.boardId;
  const board = getBoard(boardId, boardsPath);

  if (board === undefined) {
    res
      .status(404)
      .json({ message: `Board with id ${boardId} doesn't exist!` });
  } else {
    res
      .set('content-type', 'application/json')
      .status(200)
      .json(board);
  }
});

router.route('/:id').put((req, res) => {
  const boardId = req.params.id;
  const boardData = req.body;
  const updatedboard = updateBoard(boardId, boardData, boardsPath);

  if (updatedboard === undefined) {
    res
      .status(400)
      .json({ message: `Board with id ${boardId} doesn't exist!` });
  } else {
    res
      .set('content-type', 'application/json')
      .status(200)
      .json(updatedboard);
  }
});

router.route('/:id').delete((req, res) => {
  const boardId = req.params.id;
  const board = deleteBoard(boardId, boardsPath);

  if (board === undefined) {
    res
      .status(404)
      .json({ message: `Board with id ${boardId} doesn't exist!` });
  } else {
    res.sendStatus(204);
  }
});

module.exports = router;
