const { saveAllResources } = require('../repository');

const createResource = (resourceData, resourceModel) =>
  new resourceModel(resourceData);

const saveResources = (resource, pathToDb) => {
  saveAllResources(JSON.stringify(resource), pathToDb);
};

module.exports = { createResource, saveResources };
