const resourcesRepo = require('./repository');
const { createResource, excludePassword } = require('./utils/resource-utils');

const getAllResources = (resourcePath) => {
  return new Promise((res, rej) => {
    resourcesRepo
      .getAllResources(resourcePath)
      .then((resources) => res(JSON.parse(resources)))
      .catch((err) => rej(err));
  });
};

const addResource = async (resourceData, resourceModel, resourcePath) => {
  const resources = await getAllResources(resourcePath);
  const newResource = createResource(resourceData, resourceModel);
  resources.push(newResource);
  resourcesRepo.saveAllResources(JSON.stringify(resources), resourcePath);

  return newResource;
};

const getResource = async (resourceId, resourcePath) => {
  const resources = await getAllResources(resourcePath);
  const resource = resources.find(({ id }) => id === resourceId);

  return resource;
};

const updateResource = async (resourceId, resourceData, resourcePath) => {
  const resources = await getAllResources(resourcePath);
  const resourceIndex = resources.findIndex(({ id }) => id === resourceId);
  const updatedResource = { id: resourceId, ...resourceData };
  resources[resourceIndex] = updatedResource;
  resourcesRepo.saveAllResources(JSON.stringify(resources), resourcePath);

  return updatedResource;
};

const deleteResource = async (resourceId, resourcePath) => {
  const resources = await getAllResources(resourcePath);
  resources.splice(resourceId, 1);

  resourcesRepo.saveAllResources(JSON.stringify(resources), resourcePath);
};

module.exports = {
  getAllResources,
  addResource,
  getResource,
  updateResource,
  deleteResource,
};
