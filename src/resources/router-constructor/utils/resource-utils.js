const { getAllResources, saveAllResources } = require('../repository');

const getAllResourcesFromDB = (resourcePath) => {
  return new Promise((res, rej) => {
    getAllResources(resourcePath)
      .then((resources) => res(JSON.parse(resources)))
      .catch((err) => rej(err));
  }).catch((err) => console.error(err));
};

const saveResourcesToDB = (resource, pathToDb) => {
  saveAllResources(JSON.stringify(resource), pathToDb);
};

const createResource = (resourceData, resourceModel) => {
  return new resourceModel(resourceData);
};

const findResource = (resources, resourceId) => {
  return resources.find(({ id }) => id === resourceId);
};

const getResourceIndex = (resources, resourceId) => {
  return resources.findIndex(({ id }) => id === resourceId);
};

module.exports = {
  getAllResourcesFromDB,
  createResource,
  saveResourcesToDB,
  findResource,
  getResourceIndex,
};
