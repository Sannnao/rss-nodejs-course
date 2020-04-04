const fs = require('fs');

const getAllResources = (resourcePath) => {
  return new Promise((res, rej) => {
    fs.readFile(resourcePath, 'utf-8', (err, resources) => {
      if (err) {
        rej('Something went wrong with getting users!');
      }

      res(resources);
    });
  });
};

const saveAllResources = (resourcePath, resources) => {
  fs.writeFile(resourcePath, resources, (err) => {
    if (err) {
      return console.error('Something went wrong when saving users...', err);
    }

    console.log('Users uccessfully saved!');
  });
};

module.exports = { getAllResources, saveAllResources };
