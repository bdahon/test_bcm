import FlightService from '../services/flight.service';

export default class Flight {
    
    static async getFlights(req, res){
        FlightService.getFlightInformation().then(response => {
            return res.status(200).json(response);
        }).catch((err) => {
            console.log(err);
            return res.status(500).json({ msg: 'Internal error' });
        });
    }

}