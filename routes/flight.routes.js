import FlightController from '../controllers/flight.controller';
import { isLogin, rateLimiterMiddleware } from './validators';

export default [
  {
    method: 'GET',
    path: '/api/flights',
    handler: FlightController.getFlights,
    validator: [ isLogin, rateLimiterMiddleware ],
  },
]