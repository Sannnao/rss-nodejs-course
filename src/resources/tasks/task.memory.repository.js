const path = require('path');
const fs = require('fs');
const { TASKS } = require('../../constants/entities');
const tasksPath = path.resolve(__dirname, '../../temp-db/', `${TASKS}.json`);
const tasksState = [];

const getTasksFromDB = () => {
  return new Promise((res, rej) => {
    // fs.readFile(tasksPath, 'utf-8', (err, tasks) => {
    //   if (err) {
    //     rej(err);
    //   } else {
    //     res(tasks);
    //   }
    // });
    res(JSON.stringify(tasksState));
  })
    .then((tasks) => JSON.parse(tasks))
    .catch(console.error);
};

const saveTaskToDB = (task, taskIndex) => {
  getTasksFromDB()
    .then((tasks) => {
      // return new Promise((res, rej) => {
      //   tasks.splice(taskIndex, 0, task);

      //   fs.writeFile(tasksPath, JSON.stringify(tasks), (err) => {
      //     if (err) {
      //       rej(err);
      //     } else {
      //       res('Task successfully added!');
      //     }
      //   });
      // });
      tasks.splice(taskIndex, 0, task);
      tasksState.splice(0, tasksState.length, ...tasks);
      console.log(tasksState);
      return 'Task successfully added!';
    })
    .then(console.log)
    .catch(console.error);
};

const updateTaskToDB = (task, taskIndex) => {
  getTasksFromDB()
    .then((tasks) => {
      // return new Promise((res, rej) => {
      //   tasks.splice(taskIndex, 1, task);

      //   fs.writeFile(tasksPath, JSON.stringify(tasks), (err) => {
      //     if (err) {
      //       rej(err);
      //     } else {
      //       res('Task successfully updated!');
      //     }
      //   });
      // });
      tasks.splice(taskIndex, 1, task);
      tasksState.splice(0, tasksState.length, ...tasks);
      return 'Task successfully updated!';
    })
    .then(console.log)
    .catch(console.error);
};

const removeTaskFromDB = (taskIndex) => {
  getTasksFromDB()
    .then((tasks) => {
      // return new Promise((res, rej) => {
      //   tasks.splice(taskIndex, 1);

      //   fs.writeFile(tasksPath, JSON.stringify(tasks), (err) => {
      //     if (err) {
      //       rej(err);
      //     } else {
      //       res('Task successfully deleted!');
      //     }
      //   });
      // });
      tasks.splice(taskIndex, 1);
      tasksState.splice(0, tasksState.length, ...tasks);
      return 'Task successfully deleted!';
    })
    .then(console.log)
    .catch(console.error);
};

const unassignTasksFromDB = (userId) => {
  getTasksFromDB()
    .then((tasks) => {
      // return new Promise((res, rej) => {
      //   tasks.splice(taskIndex, 1);

      //   fs.writeFile(tasksPath, JSON.stringify(tasks), (err) => {
      //     if (err) {
      //       rej(err);
      //     } else {
      //       res('Task successfully deleted!');
      //     }
      //   });
      // });

      tasks.forEach((task) => {
        if (task.userId === userId) {
          task.userId = null;
        }
      });

      tasksState.splice(0, tasksState.length, ...tasks);
      console.log(tasksState);
      return 'Task successfully unassigned!';
    })
    .then(console.log)
    .catch(console.error);
};

module.exports = {
  getTasksFromDB,
  saveTaskToDB,
  updateTaskToDB,
  removeTaskFromDB,
  unassignTasksFromDB,
};
