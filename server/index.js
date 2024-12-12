const app = require('./app'); // The Express app
const config = require('./utils/config');
const logger = require('./utils/logger');
const { connectToPGDatabase } = require('./utils/pg-db');

const start = async () => {
  await connectToPGDatabase();

  app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
  });
};

start();
