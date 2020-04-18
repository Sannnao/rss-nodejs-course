const Task = require('./task.model');

const getTasksFromDB = async (boardId) => {
  try {
    const tasks = await Task.find({ boardId });

    return tasks.map((task) => Task.toResponce(task));
  } catch (err) {
    throw {
      status: 404,
      message: `There are no tasks on the board with id ${boardId}!`,
      err,
    };
  }
};

const saveTaskToDB = async (boardId, taskData) => {
  try {
    taskData.boardId = boardId;
    const task = await Task.create(taskData);

    return Task.toResponce(task);
  } catch (err) {
    throw new Error(err);
  }
};

const getTaskFromDB = async (boardId, taskId) => {
  try {
    const task = await Task.findOne({ boardId, _id: taskId });

    return Task.toResponce(task);
  } catch (err) {
    throw {
      status: 404,
      message: `Task with id ${taskId} on the board with id ${boardId} doesn't exist!`,
      err,
    };
  }
};

const updateTaskToDB = async (boardId, taskId, taskData) => {
  try {
    const task = await Task.findOneAndUpdate(
      { boardId, _id: taskId },
      taskData,
      {
        new: true,
      },
    );

    return Task.toResponce(task);
  } catch (err) {
    throw {
      status: 404,
      message: `Task with id ${taskId} on the board with id ${boardId} doesn't exist!`,
      err,
    };
  }
};

const removeTaskFromDB = async (boardId, taskId) => {
  try {
    await Task.findOneAndDelete({ boardId, _id: taskId });
  } catch (err) {
    throw {
      status: 404,
      message: `Task with id ${taskId} on the board with id ${boardId} doesn't exist!`,
      err,
    };
  }
};

const unassignTasksFromDB = async (userId) => {
  await Task.updateMany({ userId }, { userId: null });
};

const removeBoardTasksFromDB = async (boardId) => {
  await Task.deleteMany({ boardId });
};

module.exports = {
  getTasksFromDB,
  getTaskFromDB,
  saveTaskToDB,
  updateTaskToDB,
  removeTaskFromDB,
  unassignTasksFromDB,
  removeBoardTasksFromDB,
};
