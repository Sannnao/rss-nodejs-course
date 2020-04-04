const {
  getResource,
  prepareToSendResources,
  saveResource,
  updateResource,
  deleteResource,
} = require('./service');

const routerCreator = (app, RESOURCE, pathToDB, resourceModel) => {
  app.get(`/${RESOURCE}/`, async (req, res) => {
    const preparedResources = await prepareToSendResources(
      pathToDB,
      resourceModel,
    );

    res.set('content-type', 'application/json');
    return res.json(preparedResources);
  });

  app.post(`/${RESOURCE}/`, async (req, res) => {
    const savedResource = await saveResource(pathToDB, req.body, resourceModel);

    res.set('content-type', 'application/json');
    return res.json(savedResource);
  });

  app.get(`/${RESOURCE}/:id`, async (req, res) => {
    const resourceId = req.params.id;
    const resource = await getResource(pathToDB, resourceId, resourceModel);

    res.set('content-type', 'application/json');
    return res.json(resource);
  });

  app.put(`/${RESOURCE}/:id`, async (req, res) => {
    const resourceId = req.params.id;
    const newResourceParams = req.body;

    res.set('content-type', 'application/json');
    const updatedResource = await updateResource(
      pathToDB,
      resourceId,
      newResourceParams,
      resourceModel,
    );
    return res.json(updatedResource);
  });

  app.delete(`/${RESOURCE}/:id`, async (req, res) => {
    const resourceId = req.params.id;

    deleteResource(pathToDB, resourceId);
    return res.sendStatus(204);
  });
};

module.exports = routerCreator;
