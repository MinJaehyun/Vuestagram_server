// libs
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import chalk from 'chalk';
import dotenv from 'dotenv';

// api
import auth from './api/auth.js';

// dotenv setup
dotenv.config();

// mongoDB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));
mongoose.connect(
	`mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.geek9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
);

// server setup
let port = 3000;

// express setup
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev')); // log request

// express routers
app.use('/', auth);

// server start
app.listen(port, () => {
	console
		.log(`${chalk.white
		.bgHex('#41b883')
		.bold(`VUESTAGRAM SERVER IS RUNNING ON ${port}`)}`
		)
});
