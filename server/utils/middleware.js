const logger = require('./logger');
const onFinished = require('on-finished');
const { getReasonPhrase } = require('http-status-codes');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const Log = require('../models/log');

console.log('Log', Log);

// Extend dayjs with the plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('America/New_York');

const logsRecorder = (req, res, next) => {
  // Attach a listener to the end of the response
  const requestStartTime = dayjs();
  onFinished(res, async (err, res) => {
    const requestProcessingTime = dayjs().diff(
      requestStartTime,
      'millisecond',
      true
    );
    if (err) {
      console.error('Error occurred:', err);
    } else {
      const body = req.body ? JSON.stringify(req.body) : '';
      const request = `${requestStartTime.format('YYYY/MMM/DD-HH:mm:ss')} ${
        req.ip
      } ${req.method} ${req.url} ${body}`;

      const statusCode = res.statusCode;
      const statusText = getReasonPhrase(statusCode);
      const response = `${statusCode} ${statusText} ${requestProcessingTime}ms`;

      const newLog = await Log.create({ request, response });
      console.log('Created: ', newLog.toJSON());
    }
  });

  next();
};

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  logsRecorder,
};
