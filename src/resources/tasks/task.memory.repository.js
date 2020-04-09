const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const pathToTaskDB = path.join(__dirname, '../../temp-db/', 'tasks.json');

const getTasksFromDB = async () => {
  try {
    const tasks = await readFile(pathToTaskDB, 'utf-8');
    return JSON.parse(tasks);
  } catch (err) {
    console.error('Something went wrong when getting tasks!', err);
    throw {
      status: 401,
      message: 'Something went wrong when getting tasks!',
    };
  }
};

const getBoardTasksFromDB = async (boardId) => {
  try {
    const tasks = await getTasksFromDB();
    const boardTasks = tasks.filter((task) => task.boardId === boardId);

    if (boardTasks.length === 0) {
      throw {
        status: 404,
        message: 'There are no tasks on the specified board!',
      };
    }

    return boardTasks;
  } catch ({ status, message }) {
    console.error(`Can't get tasks because: ${message}`);
    throw {
      status,
      message: `Can't get tasks because: ${message}`,
    };
  }
};

const saveTasksToDB = async (tasks) => {
  try {
    await writeFile(pathToTaskDB, JSON.stringify(tasks));
    console.log('Tasks saved!');
  } catch (err) {
    console.error('Something went wrong when saving tasks!', err);
    throw {
      status: 401,
      message: 'Something went wrong when saving tasks!',
    };
  }
};

const saveTaskToDB = async (newTask) => {
  try {
    const tasks = await getTasksFromDB();
    tasks.push(newTask);
    tasks.sort((a, b) => a.order - b.order);
    await saveTasksToDB(tasks);
  } catch (err) {
    console.error(`Can't save a task because: ${err.message}`);
    throw {
      status,
      message: `Can't save a task because: ${err.message}`,
    };
  }
};

const getTaskFromDB = async (boardId, taskId) => {
  try {
    const tasks = await getTasksFromDB();
    const task = tasks.find((currTask) => {
      return currTask.id === taskId && currTask.boardId === boardId;
    });

    if (task === undefined) {
      throw {
        status: 404,
        message: `Task with id ${taskId} on the board with id ${boardId} doesn't exist!`,
      };
    }

    return task;
  } catch ({ status, message }) {
    console.error(`Can't get a task because: ${message}`);
    throw {
      status,
      message: `Can't get a task because: ${message}`,
    };
  }
};

const updateTaskToDB = async (boardId, taskId, taskData) => {
  try {
    const tasks = await getTasksFromDB();
    const taskIndex = tasks.findIndex((currTask) => {
      return currTask.id === taskId && currTask.boardId === boardId;
    });

    if (taskIndex === -1) {
      throw {
        status: 404,
        message: `Task with id ${taskId} on the board with id ${boardId} doesn't exist!`,
      };
    }
    const task = tasks[taskIndex];
    const updatedTask = Object.assign({}, task, taskData);
    tasks.splice(taskIndex, 1, updatedTask);
    tasks.sort((a, b) => a.order - b.order);
    await saveTasksToDB(tasks);
    return updatedTask;
  } catch ({ status, message }) {
    console.error(`Can't update a task because: ${message}`);
    throw {
      status,
      message: `Can't update a task because: ${message}`,
    };
  }
};

const removeTaskFromDB = async (boardId, taskId) => {
  try {
    const tasks = await getTasksFromDB();
    const taskIndex = tasks.findIndex((currTask) => {
      return currTask.id === taskId && currTask.boardId === boardId;
    });

    if (taskIndex === -1) {
      throw {
        status: 404,
        message: `Task with id ${taskId} on the board with id ${boardId} doesn't exist!`,
      };
    }
    tasks.splice(taskIndex, 1);
    await saveTasksToDB(tasks);
  } catch ({ status, message }) {
    console.error(`Can't delete a task because: ${message}`);
    throw {
      status,
      message: `Can't delete a task because: ${message}`,
    };
  }
};

const unassignTasksFromDB = async (userId) => {
  try {
    const tasks = await getTasksFromDB();
    tasks.forEach((task) => {
      if (task.userId && task.userId === userId) {
        task.userId = null;
      }
    });
    await saveTasksToDB(tasks);
  } catch ({ status, message }) {
    console.error(`Can't unassign user from a task because: ${message}`);
    throw {
      status,
      message: `Can't unassign user from a task because: ${message}`,
    };
  }
};

const removeBoardTasksFromDB = async (boardId) => {
  try {
    const tasks = await getTasksFromDB();
    const withoutBoardTasks = tasks.filter((task) => task.boardId !== boardId);
    await saveTasksToDB(withoutBoardTasks);
  } catch ({ status, message }) {
    console.error(`Can't remove board tasks because: ${message}`);
    throw {
      status,
      message: `Can't remove board tasks because: ${message}`,
    };
  }
};

module.exports = {
  getTasksFromDB,
  getBoardTasksFromDB,
  getTaskFromDB,
  saveTaskToDB,
  updateTaskToDB,
  removeTaskFromDB,
  unassignTasksFromDB,
  removeBoardTasksFromDB,
};
