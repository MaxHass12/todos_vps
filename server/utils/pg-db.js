const Sequelize = require('sequelize');
const { POSTGRES_URI } = require('./config');

const sequelize = new Sequelize(POSTGRES_URI);

const connectToPGDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('PG database connected');
  } catch (err) {
    console.log('connecting to PG database failed');
    return process.exit(1);
  }

  return null;
};

module.exports = { connectToPGDatabase, sequelize };
