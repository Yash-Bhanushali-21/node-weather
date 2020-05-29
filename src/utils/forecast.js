const request = require('request')
/* -----------date section ---- */
var d = new Date()
var today =d.getUTCDate()
var prev = today-7
var month = d.getUTCMonth() + 1; // Since getUTCMonth() returns month from 0-11 not 1-12
var year = d.getUTCFullYear();
var dateStr = today + "-" + month + "-" + year;
var startStr = prev + "-" + month + "-" + year;
const forecast = (latitude, longitude, callback) => {
    const url="http://api.weatherstack.com/current?access_key=9e5cb44eab18c6700c358c51e3cb8f22&query="+ longitude + ',' + latitude +""
    
    request({ url, json: true }, (error, { body } ) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {   
            callback(undefined,{"CurrentTemperature":body.current.temperature,
            "WeatherDescription":body.current.weather_descriptions[0],
            "WeatherHumidity":body.current.humidity,
            "WeatherPressure":body.current.pressure,
            "WindSpeed":body.current.wind_speed,
            "WindPrecip":body.current.precip,
            "WeatherIcon":body.current.weather_icons[0],
            "Visibility":body.current.Visibility

        })
        }
    })
}

module.exports = forecast
