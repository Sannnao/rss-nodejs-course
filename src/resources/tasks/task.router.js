const router = require('express').Router();
const {
  getTasks,
  addTask,
  getTask,
  updateTask,
  deleteTask,
} = require('./task.service');

router.route('/:boardId/tasks/').get(async (req, res) => {
  const boardId = req.params.boardId;
  const tasks = await getTasks(boardId);

  res
    .set('content-type', 'application/json')
    .status(200)
    .json(tasks);
});

router.route('/:boardId/tasks/').post(async (req, res) => {
  const boardId = req.params.boardId;
  const taskData = req.body;
  if (!(boardId && taskData)) {
    res
      .status(400)
      .json({ message: 'Request should contain board id and task data!' });
  } else {
    const newTask = await addTask(boardId, taskData);

    res
      .set('content-type', 'application/json')
      .status(200)
      .json(newTask);
  }
});

router.route('/:boardId/tasks/:taskId/').get(async (req, res) => {
  const boardId = req.params.boardId;
  const taskId = req.params.taskId;
  const task = await getTask(boardId, taskId);

  if (task === undefined) {
    res.status(404).json({
      message: `Task with id ${taskId} doesn't exist!`,
    });
  } else {
    res
      .set('content-type', 'application/json')
      .status(200)
      .json(task);
  }
});

router.route('/:boardId/tasks/:taskId/').put(async (req, res) => {
  const boardId = req.params.boardId;
  const taskId = req.params.taskId;
  const taskData = req.body;
  if (!(boardId && taskId && taskData)) {
    res.status(400).json({
      message: 'Request should contain board id, task id and task data!',
    });
  } else {
    const task = await updateTask(boardId, taskId, taskData);
    if (task === undefined) {
      res.status(404).json({
        message: `Task with id ${taskId} doesn't exist!`,
      });
    } else {
      res
        .set('content-type', 'application/json')
        .status(200)
        .json(task);
    }
  }
});

router.route('/:boardId/tasks/:taskId/').delete(async (req, res) => {
  const boardId = req.params.boardId;
  const taskId = req.params.taskId;
  const task = await deleteTask(boardId, taskId);

  if (task === undefined) {
    res
      .set('content-type', 'application/json')
      .status(404)
      .json({
        message: `Task with id ${taskId} doesn't exist!`,
      });
  } else {
    res.sendStatus(204);
  }
});

module.exports = router;
