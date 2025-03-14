const { Pool } = require('pg');
const mongoose = require('mongoose');
require('dotenv').config();

const pgConfig = {
  user: process.env.PG_USER || 'postgres',
  host: process.env.PG_HOST || 'localhost',
  database: process.env.PG_DATABASE || 'blogapi',
  password: process.env.PG_PASSWORD || 'postgres',
  port: process.env.PG_PORT || 5432,
};

const pgPool = new Pool(pgConfig);

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/blogapi';

const connectMongo = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = {
  pgPool,
  connectMongo
};