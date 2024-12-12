const logsRouter = require('express').Router();
const Log = require('../models/log');

logsRouter.get('/', (request, response) => {
  Log.findAll({}).then((notes) => {
    response.json(notes);
  });
});

module.exports = logsRouter;
