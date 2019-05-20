import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const server = require('http').createServer(app);
const createRouter = require('./routes').createRouter;

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

createRouter(app);
server.listen(process.env.port, () => {
    console.log(`listening on port ${process.env.port}`);
});