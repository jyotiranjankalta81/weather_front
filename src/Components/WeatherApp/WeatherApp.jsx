import React, { useState, useEffect } from 'react'
import WeatherCard from './WeatherCard.jsx'
import ForecastCard from './ForecastCard.jsx'
import './weather.css'
import Navbar from '../NavBar/NavBar.jsx'
import Footer from '../Footer/Footer.jsx'
import { toast } from 'react-toastify'

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [search, setSearch] = useState()
  const [weatherDatas, setWeatherDatas] = useState(null)
  const [city, setCity] = useState('Bhubaneswar')
  const [pincode, setPincode] = useState()

  useEffect(() => {
    let fetchWeather = async () => {
      if (city && pincode) {
        toast.error('Please Choose any one either pincode or city')
      } else if (city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=48c48a9dd9290c799563ed790523077d&units=metric`
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        setWeatherDatas(data)
        setWeatherData(data)
      } else if (pincode) {
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${pincode}&appid=48c48a9dd9290c799563ed790523077d&units=metric`
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        setWeatherDatas(data)
        setWeatherData(data)
      }
    }
    fetchWeather()
  }, [pincode, city])

  console.log(weatherDatas)

  return (
    <div className='weather-app'>
      <br />
      <br />
      <div className='search_input'>
        <label htmlFor='' className='label_name'>
          Search By CityName
        </label>
        <label htmlFor='' className='label_name'>
          Seaarch By PinCode
        </label>
        <input
          type='text'
          className='search_city'
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <input
          type='text'
          className='code_search'
          value={pincode}
          onChange={e => setPincode(e.target.value)}
        />
      </div>
      <br />
      <br />
      <br />
      {weatherData && (
        <>
          <WeatherCard
            temperature={weatherData?.main?.temp}
            conditions={weatherData?.weather?.[0]?.description}
            humidity={weatherData?.main?.humidity}
            windSpeed={weatherData?.wind?.speed}
            city={weatherData?.name}
          />
          <div className='forecast-container'>
            {weatherData &&
              weatherData?.length >= 2 &&
              weatherData.forecast.map(dayForecast => (
                <ForecastCard
                  key={dayForecast.date}
                  date={dayForecast.date}
                  temperature={dayForecast.temperature}
                  conditions={dayForecast.conditions}
                />
              ))}
          </div>
        </>
      )}
    </div>
  )
}

export default WeatherApp
