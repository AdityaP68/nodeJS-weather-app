const coordinateAPI = (location, callback) =>{
    const request = require('request');
    const geoCodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token=pk.eyJ1IjoidHJlbmNoNjY3NyIsImEiOiJja3llbDMzb2swNDd1MzJsZ3pzYXZtYjBnIn0.FC7hYVjlMnCeOv3ddcQw5A&limit=1';
    request({url: geoCodeURL, json:true}, (error, response)=>{
        if(error){
            callback(error,undefined);
        }
        else if(response.body.features.length === 0){
            callback('Wrong input provided', undefined);
        }
        else{
            //console.log(response.body.features[0]);
            callback(undefined, {
                
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0]
            })
        }

    });
}

module.exports =  coordinateAPI
