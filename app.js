var button = document.querySelector('.button')
var inputValue = document.querySelector('.inputValue')
var name = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');

button.addEventListener('click',function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=20d6fd7516dab8d1208f887fbc171f91')
    .then(response => response.json())
    .then(data => {
        var nameValue = data['name'];
        var tempValue = data['main']['temp'];
        var descValue = data['weather'][0]['description'];

        // Convert Kelvin to Celsius
        var celsiusTemp = (tempValue - 273.15).toFixed(0);
        var feelsLike = (data.main.feels_like - 273.15).toFixed(0);
        var tempMin = (data.main.temp_min - 273.15).toFixed(0);
        var tempMax = (data.main.temp_max - 273.15).toFixed(0);

        // Convert sunrise/sunset timestamps to local time
        var sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        var sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

        name.innerHTML = nameValue;
        temp.innerHTML = `Temperature: ${celsiusTemp}°C`;
        desc.innerHTML = `Weather: ${descValue}`;
        
        // Add new weather information
        document.querySelector('.feels-like').innerHTML = `Feels Like: ${feelsLike}°C`;
        document.querySelector('.humidity').innerHTML = `Humidity: ${data.main.humidity}%`;
        document.querySelector('.wind-speed').innerHTML = `Wind Speed: ${data.wind.speed} m/s`;
        document.querySelector('.pressure').innerHTML = `Pressure: ${data.main.pressure} hPa`;
        document.querySelector('.max-min-temp').innerHTML = `Max/Min Temp: ${tempMax}°C / ${tempMin}°C`;
        document.querySelector('.sunrise-sunset').innerHTML = `Sunrise: ${sunrise} | Sunset: ${sunset}`;
    })

.catch(err => alert("Wrong City Name!!"))
})