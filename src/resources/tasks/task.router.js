const {
  getTasks,
  addTask,
  getTask,
  updateTask,
  deleteTask,
} = require('./task.service');
const path = require('path');
const { TASKS, BOARDS } = require('../../constants/entities');
const boardsPath = path.resolve(__dirname, '../../temp-db/', `${BOARDS}.json`);

const taskRouter = (app) => {
  app.get(`/${BOARDS}/:boardId/${TASKS}/`, async (req, res) => {
    const boardId = req.params.boardId;
    const tasks = await getTasks(boardId, boardsPath);

    res.set('content-type', 'application/json');
    return res.json(tasks);
  });

  app.post(`/${BOARDS}/:boardId/${TASKS}/`, async (req, res) => {
    const boardId = req.params.boardId;
    const taskData = req.body;
    const newTask = await addTask(boardId, taskData, boardsPath);
    res.set('content-type', 'application/json');
    return res.json(newTask);
  });

  app.get(`/${BOARDS}/:boardId/${TASKS}/:taskId/`, async (req, res) => {
    const boardId = req.params.boardId;
    const taskId = req.params.taskId;
    const tasks = await getTask(boardId, taskId, boardsPath);

    res.set('content-type', 'application/json');
    return res.json(tasks);
  });

  app.put(`/${BOARDS}/:boardId/${TASKS}/:taskId/`, async (req, res) => {
    const boardId = req.params.boardId;
    const taskId = req.params.taskId;
    const taskData = req.body;
    const task = await updateTask(boardId, taskId, taskData, boardsPath);

    res.set('content-type', 'application/json');
    return res.json(task);
  });

  app.delete(`/${BOARDS}/:boardId/${TASKS}/:taskId/`, async (req, res) => {
    const boardId = req.params.boardId;
    const taskId = req.params.taskId;
    await deleteTask(boardId, taskId, boardsPath);

    res.set('content-type', 'application/json');
    return res.sendStatus(204);
  });
};

module.exports = taskRouter;
