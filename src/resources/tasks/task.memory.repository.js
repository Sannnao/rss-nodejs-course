// const fs = require('fs');
// const path = require('path');
// const util = require('util');

// const readFile = util.promisify(fs.readFile);
// const writeFile = util.promisify(fs.writeFile);
// const pathToTaskDB = path.join(__dirname, '../../temp-db/', 'tasks.json');

const tasksState = [];

const getTasksFromDB = async () => {
  // const tasks = await readFile(pathToTaskDB, 'utf-8');
  // return JSON.parse(tasks);
  return [...tasksState];
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
    throw {
      status,
      message: `Can't get tasks because: ${message}`,
    };
  }
};

const saveTasksToDB = async (tasks) => {
  // await writeFile(pathToTaskDB, JSON.stringify(tasks));
  // console.log('Tasks saved!');
  tasksState.splice(0, tasksState.length, ...tasks);
};

const saveTaskToDB = async (newTask) => {
  const tasks = await getTasksFromDB();
  tasks.push(newTask);
  tasks.sort((a, b) => a.order - b.order);
  await saveTasksToDB(tasks);
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
    throw {
      status,
      message: `Can't delete a task because: ${message}`,
    };
  }
};

const unassignTasksFromDB = async (userId) => {
  const tasks = await getTasksFromDB();
  tasks.forEach((task) => {
    if (task.userId && task.userId === userId) {
      task.userId = null;
    }
  });
  await saveTasksToDB(tasks);
};

const removeBoardTasksFromDB = async (boardId) => {
  const tasks = await getTasksFromDB();
  const withoutBoardTasks = tasks.filter((task) => task.boardId !== boardId);
  await saveTasksToDB(withoutBoardTasks);
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
