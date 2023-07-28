import React from 'react'

const WeatherCard = ({
  temperature,
  conditions,
  humidity,
  windSpeed,
  city
}) => {
  return (
    <div className='weather-card'>
      <div className='temperature'>{temperature}°C</div>
      <div className='conditions_city'>{city}</div>
      <div className='conditions'>{conditions}</div>
      <div className='details'>
        <div>Humidity: {humidity}%</div>
        <div>Wind Speed: {windSpeed} m/s</div>
      </div>
    </div>
  )
}

export default WeatherCard
