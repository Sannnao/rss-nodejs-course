const createResource = (resourceData, resourceModel) =>
  new resourceModel(resourceData);
const excludePassword = (resourceData, resourceModel) =>
  resourceModel.toResponse(resourceData);

module.exports = { createResource, excludePassword };
