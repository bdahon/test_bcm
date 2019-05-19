import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
// import mongoose from 'mongoose';

const app = express();
const server = require('http').createServer(app);

const createRouter = require('./routes').createRouter;

// mongoose.Promise = Promise

// mongoose.connect(`mongodb://${process.env.host}:${process.env.dbPort}/${process.env.dbName}`, { useNewUrlParser: true });

// const db = mongoose.connection;

// db.on('error', () => {
//   process.exit(1)
// });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// db.once('open', () => {
createRouter(app);
server.listen(process.env.port, () => {
    console.log(`listening on port ${process.env.port}`);
});
// });