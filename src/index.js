// libs
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import chalk from 'chalk';
import dotenv from 'dotenv';

// api
import auth from './api/auth.js';
import docs from './utils/api-doc.js';
import posts from './api/posts.js';
import findAll from './api/findAll.js';

// utils
import { authenticateUser } from './utils/auth.js';

// dotenv setup
dotenv.config();

// mongoDB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));
mongoose.connect(
  `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.geek9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
);

// server setup
const PORT = process.env.PORT;

// express setup
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

// express routers
app.use('/auth', auth);
app.use('/findAll', findAll);
app.use('/posts', authenticateUser, posts);

// api docs
app.use('/', docs);

// server start
app.listen(PORT, () => {
  console.log(
    `${chalk.white
      .bgHex('#41b883')
      .bold(`VUESTAGRAM SERVER IS RUNNING ON ${PORT}`)}`,
  );
});
