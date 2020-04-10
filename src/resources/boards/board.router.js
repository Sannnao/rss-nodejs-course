const router = require('express').Router();
const {
  getAllBoards,
  addBoard,
  getBoard,
  updateBoard,
  deleteBoard,
} = require('./board.service');

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await getAllBoards();

    res.status(200).json(boards);
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  const bodyData = req.body;
  if (!Object.keys(bodyData).length) {
    return next({ status: 400, message: 'Request should contains body!' });
  }

  try {
    const newBoard = await addBoard(bodyData);

    res.status(200).json(newBoard);
  } catch (err) {
    return next(err);
  }
});

router.route('/:boardId').get(async (req, res, next) => {
  const boardId = req.params.boardId;
  if (!boardId) {
    return next({ status: 400, message: 'Request should contains board id!' });
  }

  try {
    const board = await getBoard(boardId);
    res.status(200).json(board);
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').put(async (req, res, next) => {
  const boardId = req.params.id;
  const boardData = req.body;
  if (!(boardId && boardData)) {
    return next({
      status: 400,
      message: 'Requrest should contain boardId and board data!',
    });
  }

  try {
    const updatedboard = await updateBoard(boardId, boardData);

    res.status(200).json(updatedboard);
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  const boardId = req.params.id;
  if (!boardId) {
    return next({ status: 400, message: 'Request should contains board id!' });
  }

  try {
    await deleteBoard(boardId);

    res.sendStatus(204);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
