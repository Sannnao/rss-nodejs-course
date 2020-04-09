const router = require('express').Router();
const {
  getTasks,
  saveTask,
  getTask,
  updateTask,
  deleteTask,
} = require('./task.service');

router.route('/:boardId/tasks/').get(async (req, res) => {
  const boardId = req.params.boardId;
  if (!boardId) {
    return res
      .status(400)
      .json({ message: 'Request should contains board id!' });
  }

  try {
    const tasks = await getTasks(boardId);

    res.status(200).json(tasks);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
});

router.route('/:boardId/tasks/').post(async (req, res) => {
  const boardId = req.params.boardId;
  const taskData = req.body;
  if (!(boardId && Object.keys(taskData).length)) {
    return res
      .status(400)
      .json({ message: 'Request should contain board id and task data!' });
  }

  try {
    const newTask = await saveTask(boardId, taskData);

    res.status(200).json(newTask);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
});

router.route('/:boardId/tasks/:taskId/').get(async (req, res) => {
  const boardId = req.params.boardId;
  const taskId = req.params.taskId;
  if (!(boardId && taskId)) {
    return res
      .status(400)
      .json({ message: 'Request should contain board id and task id!' });
  }

  try {
    const task = await getTask(boardId, taskId);

    res.status(200).json(task);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
});

router.route('/:boardId/tasks/:taskId/').put(async (req, res) => {
  const boardId = req.params.boardId;
  const taskId = req.params.taskId;
  const taskData = req.body;
  if (!(boardId && taskId && Object.keys(taskData).length)) {
    return res.status(400).json({
      message: 'Request should contain board id, task id and task data!',
    });
  }

  try {
    const task = await updateTask(boardId, taskId, taskData);
    res.status(200).json(task);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
});

router.route('/:boardId/tasks/:taskId/').delete(async (req, res) => {
  const boardId = req.params.boardId;
  const taskId = req.params.taskId;
  if (!(boardId && taskId)) {
    return res.status(400).json({
      message: 'Request should contain board id and task id!',
    });
  }

  try {
    await deleteTask(boardId, taskId);

    res.sendStatus(204);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
});

module.exports = router;
