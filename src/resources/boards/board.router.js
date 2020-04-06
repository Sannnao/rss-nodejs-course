const router = require('express').Router();
const {
  getAllBoards,
  addBoard,
  getBoard,
  updateBoard,
  deleteBoard,
} = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await getAllBoards();

  res
    .set('content-type', 'application/json')
    .status(200)
    .json(boards);
});

router.route('/').post(async (req, res) => {
  const newBoard = await addBoard(req.body);

  res
    .set('content-type', 'application/json')
    .status(200)
    .json(newBoard);
});

router.route('/:boardId').get(async (req, res) => {
  const boardId = req.params.boardId;
  const board = await getBoard(boardId);

  if (board === undefined) {
    res
      .set('content-type', 'application/json')
      .status(404)
      .json({ message: `Board with id ${boardId} doesn't exist!` });
  } else {
    res
      .set('content-type', 'application/json')
      .status(200)
      .json(board);
  }
});

router.route('/:id').put(async (req, res) => {
  const boardId = req.params.id;
  const boardData = req.body;
  if (!(boardId && boardData)) {
    res
      .set('content-type', 'application/json')
      .status(400)
      .json({ message: 'Requrest should contain boardId and board data!' });
  } else {
    const updatedboard = await updateBoard(boardId, boardData);

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
  }
});

router.route('/:id').delete(async (req, res) => {
  const boardId = req.params.id;
  const board = await deleteBoard(boardId);

  if (board === undefined) {
    res
      .set('content-type', 'application/json')
      .status(404)
      .json({ message: `Board with id ${boardId} doesn't exist!` });
  } else {
    res.sendStatus(204);
  }
});

module.exports = router;
