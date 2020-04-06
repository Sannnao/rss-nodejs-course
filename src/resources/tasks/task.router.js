const router = require('express').Router();
const {
  getTasks,
  addTask,
  getTask,
  updateTask,
  deleteTask,
} = require('./task.service');

router.route('/:boardId/tasks/').get((req, res) => {
  const boardId = req.params.boardId;
  const tasks = getTasks(boardId);

  res
    .set('content-type', 'application/json')
    .status(200)
    .json(tasks);
});

router.route('/:boardId/tasks/').post((req, res) => {
  const boardId = req.params.boardId;
  const taskData = req.body;
  const newTask = addTask(boardId, taskData);

  if (!(boardId && taskData)) {
    res
      .status(400)
      .json({ message: 'Request should contain board id and task data!' });
  } else {
    res
      .set('content-type', 'application/json')
      .status(200)
      .json(newTask);
  }
});

router.route('/:boardId/tasks/:taskId/').get((req, res) => {
  const boardId = req.params.boardId;
  const taskId = req.params.taskId;
  const task = getTask(boardId, taskId);

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

router.route('/:boardId/tasks/:taskId/').put((req, res) => {
  const boardId = req.params.boardId;
  const taskId = req.params.taskId;
  const taskData = req.body;
  const task = updateTask(boardId, taskId, taskData);

  if (!(boardId && taskId && taskData)) {
    res.status(400).json({
      message: 'Request should contain board id, task id and task data!',
    });
  } else if (task === undefined) {
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

router.route('/:boardId/tasks/:taskId/').delete((req, res) => {
  const boardId = req.params.boardId;
  const taskId = req.params.taskId;
  const task = deleteTask(boardId, taskId);

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
