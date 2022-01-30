
const location =({latitude,longitude}={}, callback)=>{
    const request = require('request');
    const url = 'http://api.weatherstack.com/current?access_key=284560ac17cda8f5df28bd26d5eeb0c8&query='+latitude+','+longitude;
    request({url: url, json:true}, (error, response)=>{
        if(error){
            callback(error,undefined);
        }
        else if(response.body.error){
            callback('error', undefined);
        }
        else{
            const temperature = response.body.current.temperature;
            const  precipitation = response.body.current.humidity;
            const location = response.body.location.name;

            callback(undefined, {
                temperature,
                precipitation,
                location
            });
        }
    });
}

module.exports = location;
