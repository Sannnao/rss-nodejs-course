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

const boardsRouter = (app) => {
  app.get(`/${BOARDS}/`, async (req, res) => {
    const boards = await getAllBoards(boardsPath);

    res.set('content-type', 'application/json');
    return res.json(boards);
  });

  app.post(`/${BOARDS}/`, async (req, res) => {
    const newboard = await addBoard(req.body, boardsPath);

    res.set('content-type', 'application/json');
    return res.json(newboard);
  });

  app.get(`/${BOARDS}/:boardId/`, async (req, res) => {
    const boardId = req.params.boardId;
    const board = await getBoard(boardId, boardsPath);

    res.set('content-type', 'application/json');
    return res.json(board);
  });

  app.put(`/${BOARDS}/:id`, async (req, res) => {
    const boardId = req.params.id;
    const boardData = req.body;
    const updatedboard = await updateBoard(boardId, boardData, boardsPath);

    res.set('content-type', 'application/json');
    return res.json(updatedboard);
  });

  app.delete(`/${BOARDS}/:id`, async (req, res) => {
    const boardId = req.params.id;

    await deleteBoard(boardId, boardsPath);
    return res.sendStatus(204);
  });
};

module.exports = boardsRouter;
