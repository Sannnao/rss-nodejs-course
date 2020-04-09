const router = require('express').Router();
const {
  getAllBoards,
  addBoard,
  getBoard,
  updateBoard,
  deleteBoard,
} = require('./board.service');

router.route('/').get(async (req, res) => {
  try {
    const boards = await getAllBoards();

    res.status(200).json(boards);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
});

router.route('/').post(async (req, res) => {
  const bodyData = req.body;
  if (!Object.keys(bodyData).length) {
    return res.status(400).json({ message: 'Request should contains body!' });
  }

  try {
    const newBoard = await addBoard(bodyData);

    res.status(200).json(newBoard);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
});

router.route('/:boardId').get(async (req, res) => {
  const boardId = req.params.boardId;
  if (!boardId) {
    return res
      .status(400)
      .json({ message: 'Request should contains board id!' });
  }

  try {
    const board = await getBoard(boardId);
    res.status(200).json(board);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
});

router.route('/:id').put(async (req, res) => {
  const boardId = req.params.id;
  const boardData = req.body;
  if (!(boardId && boardData)) {
    return res
      .status(400)
      .json({ message: 'Requrest should contain boardId and board data!' });
  }

  try {
    const updatedboard = await updateBoard(boardId, boardData);

    res.status(200).json(updatedboard);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
});

router.route('/:id').delete(async (req, res) => {
  const boardId = req.params.id;
  if (!boardId) {
    return res
      .status(400)
      .json({ message: 'Request should contains board id!' });
  }

  try {
    await deleteBoard(boardId);

    res.sendStatus(204);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
});

module.exports = router;
