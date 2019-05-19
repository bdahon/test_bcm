import express from 'express';
import userRoutes from './user.routes';
import flightRoutes from './flight.routes';

export const routes = [
  ...userRoutes,
  ...flightRoutes
];

export const createRouter = app => {
  const router = express.Router();

  routes.forEach(r => {
    router[r.method.toLowerCase()](r.path, async (req, res) => {
      for (const validator of r.validator) {
        await validator(req, res);
      }
      await r.handler(req, res);
    });
  });

  app.use(router);

}