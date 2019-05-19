import request from 'superagent';
import webservices from "./config/webservices";
import csvjson from 'csvjson';

export default class PromocodeService {
   
    static requestFlightInfo(provider){
      
        return new Promise((resolve, reject) => {
            request.get(provider.url).set("X-API-Key", webservices.airApi.apiKey).timeout({
                deadline: 30000, // allow 30 seconds for the file to finish loading.
              }).then( res => {
                if (provider.name === "AIR_BEAM"){
                    const response = csvjson.toObject(res.res.text);
                    let newResponse = [];

                    for (let i = 0; i < response.length; i++){
                        const { id, p : price, departure :  departure_time, arrival: arrival_time } = response[i];
                        
                        newResponse.push(Object.assign({}, { id, price, departure_time, arrival_time}));
                    }
                    resolve({ name: provider.name, response: newResponse });
                } else if (provider.name === "AiR_JAZZ"){
                    let newResponse = [];
                    
                    for (let i = 0; i < res.body.length; i++){
                        const { id, price, atime: arrival_time, dtime : departure_time } = res.body[i];
                       
                        newResponse.push(Object.assign({}, { id, price, departure_time, arrival_time}));
                    }
                    resolve({ name: provider.name, response: newResponse });
                }else {
                    resolve({ name: provider.name, response: res.body });
                }
            }).catch( err => {
                if (err.code === "ABORTED"){
                    resolve({ name: provider.name, response: [], error: "timeout" });
                }else if (provider.name === "Air_JAZZ" && err.code === 502){
                    resolve({ name: provider.name, response: [], error: "HTTP 502 Bad Gateway" });
                }else{
                    reject(err);
                }
            });
        });
    }

    static getLowerPriceDetailPerName(flightsInfo, FlightsInfoResults){
        let lowerFlightInfo, tmpLower;

        flightsInfo.forEach(flightsInfoDetail => {
            flightsInfoDetail.response.forEach(elem => {
                const isAlreadyRegister = FlightsInfoResults ? FlightsInfoResults.filter(result => result.id === elem.id) : [];
                
                if ((!tmpLower || tmpLower >  parseFloat(elem.price)) && isAlreadyRegister.length === 0){
                    tmpLower = parseFloat(elem.price);
                    lowerFlightInfo = {
                        id: elem.id,
                        provider : flightsInfoDetail.name,
                        price: parseFloat(elem.price),
                        departure_time: elem.departure_time,
                        arrival_time: elem.arrival_time
                    };
                }
            });
        });
        return lowerFlightInfo;
    }

    static ParseFlightsInfo(flightsInfo, FlightsInfoResults = []){
        if (FlightsInfoResults.length < 50){
            const lowerPriceDetail = this.getLowerPriceDetailPerName(flightsInfo, FlightsInfoResults);

            FlightsInfoResults.push(lowerPriceDetail);
            return this.ParseFlightsInfo(flightsInfo, FlightsInfoResults);
        } 
        return FlightsInfoResults
    }

    static async getFlightInformation(){
        try {
            const flightsInfo = await Promise.all(webservices.airApi.providers.map(this.requestFlightInfo));
            const response = this.ParseFlightsInfo(flightsInfo);
            
            return response;
        } catch (err) {
            return err;
        }
    }
};
