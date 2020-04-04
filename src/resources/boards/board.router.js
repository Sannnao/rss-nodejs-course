const path = require('path');
const routerCreator = require('../router-constructor/router');
const Board = require('./board.model');
const { BOARDS } = require('../../constants/entities');
const boardsPath = path.resolve(__dirname, '../../temp-db/', `${BOARDS}.json`);

const boardsRouter = (app) => {
  routerCreator(app, BOARDS, boardsPath, Board);
};

module.exports = boardsRouter;
