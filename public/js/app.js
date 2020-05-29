
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
const icon = document.querySelector('#mainImage')
const WeatherCard = document.querySelector('#weatherCardDisplay')
const footer=document.querySelector('footer')

/* -----------dat section ---- */
var d = new Date()
var today =d.getUTCDate()
var prev = today-7
var month = d.getUTCMonth() + 1; // Since getUTCMonth() returns month from 0-11 not 1-12
var year = d.getUTCFullYear();
var dateStr = today + "-" + month + "-" + year;
var startStr = prev + "-" + month + "-" + year;

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

    fetch('/weather?address=' + location).then((response) => {
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
                footer.style.top = "0" //resetting the footer to original place.
                WeatherCard.style.display="block" //show data card after data rendered.
                icon.src=''+data.forecast.WeatherIcon              
                
                var ctx = document.getElementById('myChart').getContext('2d');

                var chart = new Chart(ctx, {
                        // The type of chart we want to create
                   type: 'line',

                      // The data for our dataset
                   data: {
                           labels: ['Temperature', 'WindSpeed', 'Pressure', 'Precipitation', 'Humidity', 'Visibility'],
                          datasets: [{
                                   label: 'Temperature Attributes',
                                   backgroundColor: 'rgb(255, 99, 132)',
                                   borderColor: 'rgb(255, 99, 132)',
                                   data: [data.forecast.CurrentTemperature, data.forecast.WindSpeed, data.forecast.WeatherPressure, data.forecast.WeatherPressure,data.forecast.humidity,data.forecast.Visibility]
                         }]
                    },
                     // Configuration options go here
                  options: {}
                  }

                  );
                  chart.update()

            }
        })
    })
})

