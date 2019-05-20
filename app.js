import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cluster from 'cluster';
import { cpus } from 'os';

const app = express();
const server = require('http').createServer(app);
const createRouter = require('./routes').createRouter;

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (cluster.isMaster) {
    for (let i = 0; i < cpus().length; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    createRouter(app);
    server.listen(process.env.port, () => {
        console.log(`listening on port ${process.env.port}`);
    });
    console.log(`Worker ${process.pid} started`);
  }
