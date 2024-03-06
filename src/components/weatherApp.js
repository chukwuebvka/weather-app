import React from 'react';
import cloudsVideo from '../assets/clouds.mp4'
import humidityIcon from '../assets/humidity.png'
import windIcon from '../assets/wind.png'

function WeatherApp() {
    const [weather, setWeather] = React.useState({
        cloudImage: "",
        temperature: "",
        city: "",
        country: "",
        humidity: "",
        windSpeed: "",
        text: "",
    })
    const [forecast, setForecast] = React.useState()
    const [search, setSearch] = React.useState("")

    function getWeatherForecast() {
            if (forecast) {
            setWeather(prevWeather => {
                return {
                    ...prevWeather,
                    cloudImage: "https://openweathermap.org/img/wn/" + forecast.weather[0].icon + ".png",
                    text: forecast.weather[0].description,
                    temperature: forecast.main.temp,
                    city: forecast.name,
                    country: forecast.sys.country,
                    humidity: forecast.main.humidity,
                    windSpeed: forecast.wind.speed,
                }
            })
        }

    }

    React.useEffect(() => {
        if (search !== "") {
            let apiKey = "9d4765d2ccd79eb61a0fded2ab1c6606";
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${apiKey}`)
                .then(res => res.json())
                .then(data => setForecast(data))
                // .then(data => console.log(data))
                .catch((error) => console.error('Error fetching weather data:', error));
            }
        }, [search]);
    
  return (
    <div className="flex justify-start items-center flex-col h-screen">
        <div className="relative w-full h-full">
            <video 
                src={cloudsVideo}
                type="video/mp4"
                loop
                controls={false}
                muted
                autoPlay
                playsInline
                className="w-full h-full object-cover"
            />
            
            <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 text-white">
                <div className="p-5 font-bold">
                    <h1>Weather</h1>
                </div>
                <div>
                    <input 
                        type="text"
                        placeholder="Search for a city"
                        className="m-2 p-2 rounded text-black"
                        name="search"
                        value={search}
                        onChange={event => setSearch(event.target.value)}
                        // onKeyDown={(event) => event.key === "Enter" && searchResultData(searchCity)}
                    />
                    <button onClick={getWeatherForecast}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                {weather.cloudImage && <div>
                    <img 
                        src={weather.cloudImage}
                        width="130px"
                        alt="weather"
                    />
                </div>}
                <p className="text-sm">{weather.text}</p>
                <div className="font-bold text-xl m-4">
                    {weather.temperature && <h1>{weather.temperature} °C</h1>}
                </div>
                <div className="text-lg">
                    {weather.city && <h3>{weather.city}, {weather.country}</h3>}
                </div>
                <div className="flex justify-between p-8">
                    {weather.humidity && <div className="pr-12">
                        <div className="flex">
                            <img 
                                src={humidityIcon} 
                                width="20px"
                                alt="humidity"
                            />
                            {weather.humidity}%
                        </div>
                        <h4>Humidity</h4>
                    </div>}
                    {weather.windSpeed && <div className="pl-12">
                        <div className="flex">
                            <img 
                                src={windIcon} 
                                width="20px"
                                alt="wind"
                            />
                            <p>{weather.windSpeed}KPH</p>
                        </div>
                        <h4>Wind Speed</h4>
                    </div>}
                </div>
            </div>
        </div>
    </div>
  )
}                 

export default WeatherApp;
