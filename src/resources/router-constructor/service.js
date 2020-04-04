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

const prepareToSendResources = async (resourcePath, resourceModel) => {
  const resources = await getAllResources(resourcePath);
  const resourcesWithoutPass = resources.map((user) => {
    return excludePassword(user, resourceModel);
  });

  return resourcesWithoutPass;
};

const saveResource = async (resourcePath, resourceData, resourceModel) => {
  const newResource = createResource(resourceData, resourceModel);
  const resources = await getAllResources(resourcePath);
  resources.push(newResource);
  resourcesRepo.saveAllResources(resourcePath, JSON.stringify(resources));

  return excludePassword(newResource, resourceModel);
};

const getResource = async (resourcePath, resourceId, resourceModel) => {
  const resources = await getAllResources(resourcePath);
  const resource = resources.find(({ id }) => id === resourceId);

  return excludePassword(resource, resourceModel);
};

const updateResource = async (
  resourcePath,
  resourceId,
  newResourceParams,
  resourceModel,
) => {
  const resources = await getAllResources(resourcePath);
  const resourceIndex = resources.findIndex(({ id }) => id === resourceId);
  const updatedResource = { id: resourceId, ...newResourceParams };
  resources[resourceIndex] = updatedResource;
  resourcesRepo.saveAllResources(resourcePath, JSON.stringify(resources));

  return excludePassword(updatedResource, resourceModel);
};

const deleteResource = async (resourcePath, resourceId) => {
  const resources = await getAllResources(resourcePath);
  const updatedResources = resources.filter(({ id }) => id !== resourceId);

  resourcesRepo.saveAllResources(
    resourcePath,
    JSON.stringify(updatedResources),
  );
};

module.exports = {
  getAllResources,
  getResource,
  saveResource,
  updateResource,
  deleteResource,
  prepareToSendResources,
};
