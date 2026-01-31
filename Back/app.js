const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const crons =  require('./cron-jobs/crons')

dotenv.config();

const app = express();
const userRoutes = require('./routes/user');

const MONGO_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME
const MONGO_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD
const DB_NAME = process.env.DB_NAME
const DB_HOST = process.env.DB_HOST
const DATABASE_URL = process.env.DATABASE_URL || `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${DB_HOST}:27017/${DB_NAME}`;

//console.log({DATABASE_URL})

mongoose.connect(DATABASE_URL)
.then(() => console.log(`Connexion à ${DB_NAME} réussie !`))
.catch(err => console.log(err));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/user', userRoutes);

module.exports = app;
