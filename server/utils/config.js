require('dotenv').config();

let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;
let POSTGRES_URI = process.env.POSTGRES_URI;

module.exports = {
  MONGODB_URI,
  PORT,
  POSTGRES_URI,
};
