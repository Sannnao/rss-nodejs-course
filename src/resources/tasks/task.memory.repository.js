const tasksState = [];

const getTasksFromDB = () => {
  return [...tasksState];
};

const saveTaskToDB = (newTask) => {
  tasksState.push(newTask);
  tasksState.sort((a, b) => a.order - b.order);

  return 'Task successfully added!';
};

const updateTaskToDB = (updatedTask) => {
  const taskIndex = tasksState.findIndex(({ id }) => id === updatedTask.id);
  tasksState.splice(taskIndex, 1, updatedTask);
  tasksState.sort((a, b) => a.order - b.order);
  return 'Task successfully updated!';
};

const removeTaskFromDB = (taskId) => {
  const taskIndex = tasksState.findIndex(({ id }) => id === taskId);
  tasksState.splice(taskIndex, 1);
  return 'Task successfully deleted!';
};

const unassignTasksFromDB = (userId) => {
  tasksState.forEach((task) => {
    if (task.userId === userId) {
      task.userId = null;
    }
  });
  return 'Task successfully unassigned!';
};

const removeBoardTasksFromDB = (boardId) => {
  const withoutBoardTasks = tasksState.filter(
    (task) => task.boardId !== boardId,
  );

  tasksState.splice(0, tasksState.length, ...withoutBoardTasks);
};

module.exports = {
  getTasksFromDB,
  saveTaskToDB,
  updateTaskToDB,
  removeTaskFromDB,
  unassignTasksFromDB,
  removeBoardTasksFromDB,
};
