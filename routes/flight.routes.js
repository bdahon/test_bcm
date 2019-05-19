import FlightController from '../controllers/flight.controller';
import { isLogin } from './validators';

export default [
  {
    method: 'GET',
    path: '/api/flights',
    handler: FlightController.getFlights,
    validator: [ isLogin ],
  },
]