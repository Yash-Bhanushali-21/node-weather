const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url="http://api.weatherstack.com/current?access_key=9e5cb44eab18c6700c358c51e3cb8f22&query="+ longitude + ',' + latitude

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
            "WindPrecip":body.current.precip
        })
        }
    })
}

module.exports = forecast