console.log('Client side javascript file is loaded!')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')
const temperature = document.querySelector('.temp')
const heading = document.querySelector('.head')
const date = document.querySelector('.timestamp')
const description = document.querySelector('.desc')
const pressure = document.querySelector('.press')
const precipitation = document.querySelector('.preci')
const wind = document.querySelector('.speed')
const WeatherCard = document.querySelector('#weatherCardDisplay')



WeatherCard.style.display="none"; //hide weather card before trigger action
function stringManip({CurrentTemperature,WeatherDescription,WeatherHumidity,WeatherPressure}={}) {
    
    messageTwo=''
    messageTwo="current Temperature is "+CurrentTemperature+"current desk is "+WeatherDescription+"current humid is "+WeatherHumidity+"current press is "+WeatherPressure
    return messageTwo
    

}
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent='Loading.....'
    messageTwo.textContent=""
    messageThree.textContent=""
    messageFour.textContent=""
    messageFive.textContent=""

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            messageOne.textContent=''
            if (data.error) {
                WeatherCard.style.display="none"; 
                messageOne.textContent=data.error
                messageTwo=''
            } else {
                heading.textContent=''+data.location
                temperature.textContent=""+data.forecast.CurrentTemperature
                description.textContent=""+data.forecast.WeatherDescription
                wind.textContent=""+data.forecast.WindSpeed
                pressure.textContent="Pressure : "+data.forecast.WeatherPressure
                precipitation.textContent=""+data.forecast.WindPrecip
                WeatherCard.style.display="block" //show data card after data rendered.


                

            }
        })
    })
})